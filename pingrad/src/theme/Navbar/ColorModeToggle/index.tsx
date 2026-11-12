import React from 'react';
import NavbarColorModeToggle from '@theme-original/Navbar/ColorModeToggle';
import LocaleDropdownNavbarItem from '@theme/NavbarItem/LocaleDropdownNavbarItem';
import {translate} from '@docusaurus/Translate';

export default function NavbarControls({className}: React.ComponentProps<typeof NavbarColorModeToggle>): React.JSX.Element {
  const languageLabel = translate({id: 'navigation.language', message: '切换语言'});
  return (
    <div className={`pin-navbar-controls ${className ?? ''}`}>
      <LocaleDropdownNavbarItem
        position="right"
        items={[]}
        dropdownItemsBefore={[]}
        dropdownItemsAfter={[]}
        className="pin-locale-button"
        title={languageLabel}
        aria-label={languageLabel}
      />
      <NavbarColorModeToggle />
    </div>
  );
}
