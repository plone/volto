import React from 'react';
import NavItem from './NavItem';

const NavItems = ({ items, lang }) => {
  return (
    <>
      {items.map((item) => (
        <NavItem item={item} lang={lang} key={item.url} />
      ))}
    </>
  );
};

export default NavItems;
