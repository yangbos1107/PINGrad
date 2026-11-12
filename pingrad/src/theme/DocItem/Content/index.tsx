import React from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import Content from '@theme-original/DocItem/Content';
import type {Props} from '@theme/DocItem/Content';

export default function DocContent(props: Props): React.JSX.Element {
  const {metadata} = useDoc();
  const isDirectory = /^regions\/(us|uk|hk|sg|au|cn)\/index$/.test(metadata.id);
  // The interface locale changes; the shared articles remain in their original language.
  return isDirectory ? <Content {...props} /> : <div lang="zh-CN"><Content {...props} /></div>;
}
