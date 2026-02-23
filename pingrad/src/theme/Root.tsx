import React, {useEffect} from 'react';

const BLOCKED_COPY_TEXT = '该内容不允许复制';

type MutableClipboard = {
  writeText: (text: string) => Promise<void>;
};

function replaceClipboardContent(event: ClipboardEvent) {
  event.preventDefault();

  if (event.clipboardData) {
    event.clipboardData.clearData();
    event.clipboardData.setData('text/plain', BLOCKED_COPY_TEXT);
    return;
  }

  if (navigator.clipboard?.writeText) {
    void navigator.clipboard.writeText(BLOCKED_COPY_TEXT).catch(() => {
      // Ignore clipboard API failures and keep preventDefault behavior.
    });
  }
}

export default function Root({children}: {children: React.ReactNode}): React.JSX.Element {
  useEffect(() => {
    let restoreClipboardWriteText: (() => void) | undefined;

    const clipboard = navigator.clipboard as unknown as MutableClipboard | undefined;
    if (clipboard?.writeText) {
      const originalWriteText = clipboard.writeText.bind(clipboard);
      try {
        clipboard.writeText = () => originalWriteText(BLOCKED_COPY_TEXT);
        restoreClipboardWriteText = () => {
          clipboard.writeText = originalWriteText;
        };
      } catch {
        restoreClipboardWriteText = undefined;
      }
    }

    document.addEventListener('copy', replaceClipboardContent, true);
    document.addEventListener('cut', replaceClipboardContent, true);

    return () => {
      document.removeEventListener('copy', replaceClipboardContent, true);
      document.removeEventListener('cut', replaceClipboardContent, true);
      restoreClipboardWriteText?.();
    };
  }, []);

  return <>{children}</>;
}
