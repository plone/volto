import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { Menu, Dropdown } from 'semantic-ui-react';
import { FormattedMessage, injectIntl } from 'react-intl';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const RenderMenuItems = ({ items }) => {
  return map(items, (item) => {
    const { id, level, title } = item;
    return (
      item && (
        <React.Fragment key={id}>
          <Menu.Item className={`headline-${level}`}>
            <AnchorLink href={`#${id}`}>{title}</AnchorLink>
          </Menu.Item>
          {item.items?.length > 0 && <RenderMenuItems items={item.items} />}
        </React.Fragment>
      )
    );
  });
};

/**
 * View toc block class.
 * @class View
 * @extends Component
 */
const View = ({ data, tocEntries }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // When the page is resized to prevent items from the TOC from going out of the viewport,
  // a dropdown menu is added containing all the items that don't fit.
  const handleResize = () => {
    const menuElement = document.querySelector('.responsive-menu');
    const containerWidth = menuElement.offsetWidth;

    // Get all divs that contain the items from the TOC, except the dropdown button
    const nested = document.querySelectorAll(
      '.responsive-menu .item:not(.dropdown)',
    );
    const nestedArray = Object.values(nested);
    const middle = Math.ceil(nestedArray.length / 2);
    const firstHalfNested = nestedArray.slice(0, middle);
    const secondHalfNested = nestedArray.slice(middle);

    const dropdown = document.querySelector('.dropdown');
    const dropdownWidth = dropdown.offsetWidth;

    const firstHalfNestedHiddenItems = [];

    // Add a 'hidden' class for the items that should be in the dropdown
    firstHalfNested.forEach((item) => {
      const itemOffsetLeft = item.offsetLeft;
      const itemOffsetWidth = item.offsetWidth;
      if (itemOffsetLeft + itemOffsetWidth > containerWidth - dropdownWidth) {
        item.classList.add('hidden');
        firstHalfNestedHiddenItems.push(item);
      } else {
        item.classList.remove('hidden');
      }
    });

    secondHalfNested.forEach((item) => item.classList.add('hidden-dropdown'));

    const diff = firstHalfNested.length - firstHalfNestedHiddenItems.length;
    const secondHalfNestedShownItems = secondHalfNested.slice(diff);
    secondHalfNestedShownItems.forEach((item) =>
      item.classList.remove('hidden-dropdown'),
    );

    // If there are elements that should be displayed in the dropdown, show the dropdown button
    if (secondHalfNestedShownItems.length > 0)
      dropdown.classList.remove('hidden-dropdown');
    else {
      dropdown.classList.add('hidden-dropdown');
    }
  };

  const handleDropdownKeyDown = (event) => {
    const dropdownMenu = document.querySelector('.menu.transition');
    if (event.key === 'ArrowDown' && isDropdownOpen) {
      event.preventDefault();
      const menuItems = dropdownMenu.querySelectorAll(
        '.item:not(.hidden-dropdown)',
      );
      const focusedItem = dropdownMenu.querySelector('.item.focused');
      const focusedIndex = Array.from(menuItems).indexOf(focusedItem);

      if (focusedIndex === -1) {
        // No item is currently focused, so focus the first item
        menuItems[0].classList.add('focused');
      } else if (focusedIndex === menuItems.length - 1) {
        // Remove focus from the currently focused item and close the dropdown
        focusedItem.classList.remove('focused');
        setIsDropdownOpen(false);

        // Focus the next element on the page
        const nextElement = dropdownMenu.nextElementSibling;
        if (nextElement) {
          nextElement.focus();
        }
      } else {
        // Remove focus from the currently focused item
        focusedItem.classList.remove('focused');

        // Focus the next item or wrap around to the first item
        const nextIndex = (focusedIndex + 1) % menuItems.length;
        menuItems[nextIndex].classList.add('focused');
      }
    } else if (event.key === 'Enter' && isDropdownOpen) {
      const focusedItem = dropdownMenu.querySelector('.item.focused');
      if (focusedItem) {
        focusedItem.querySelector('a').click();
        focusedItem.classList.remove('focused');
      }
    } else if (event.key === 'Tab') {
      const focusedItem = dropdownMenu.querySelector('.item.focused');
      if (focusedItem) {
        focusedItem.classList.remove('focused');
      }
    }
  };

  useEffect(() => {
    if (data.sticky) {
      const toc = document.querySelector('.horizontalMenu');
      const tocPos = toc ? toc.offsetTop : 0;

      const handleScroll = () => {
        let scrollPos = window.scrollY;
        if (scrollPos > tocPos && toc) {
          toc.classList.add('sticky-toc');
        } else if (scrollPos <= tocPos && toc) {
          toc.classList.remove('sticky-toc');
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [data.sticky]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <>
      {data.title && !data.hide_title ? (
        <h2>
          {data.title || (
            <FormattedMessage
              id="Table of Contents"
              defaultMessage="Table of Contents"
            />
          )}
        </h2>
      ) : (
        ''
      )}
      <Menu className="responsive-menu">
        <RenderMenuItems items={tocEntries} />
        <Dropdown
          item
          text="More"
          className="hidden-dropdown"
          open={isDropdownOpen}
          onOpen={() => setIsDropdownOpen(true)}
          onClose={() => setIsDropdownOpen(false)}
          tabIndex={0}
          onKeyDown={handleDropdownKeyDown}
        >
          <Dropdown.Menu>
            <RenderMenuItems items={tocEntries} />
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    </>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  properties: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default injectIntl(View);
