import React from 'react';
import NavItem from './NavItem';
import { Dropdown } from 'semantic-ui-react';

const NavItems = ({ items, lang }) => {
  return (
    <>
      {items.map((item) =>
        item && item.items && item.items.length > 0 ? (
          <Dropdown text={item.title} className="item" key={item.url}>
            <Dropdown.Menu key={item.url}>
              {item.items.map((dropdownitem) => (
                <NavItem
                  item={dropdownitem}
                  lang={lang}
                  key={dropdownitem.url}
                />
              ))}
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <NavItem item={item} lang={lang} key={item.url} />
        ),
      )}
    </>
  );
};

export default NavItems;
