/**
 * View toc block.
 * @module components/manage/Blocks/ToC/View
 */

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

const View = ({ data, tocEntries }) => {
  const [fittingItems, setFittingItems] = useState([]);
  const [nonFittingItems, setNonFittingItems] = useState([]);
  const menuElement = document.querySelector('.table-of-contents');
  const containerWidth = menuElement.offsetWidth;

  useEffect(() => {
    const handleResize = () => {
      const fittingItems = [];
      const nonFittingItems = [];
      const nested = document.querySelectorAll('.responsive-menu .item');
      let totalWidth = 0;

      console.log({ nested });

      tocEntries.forEach((item, index) => {
        const menuItemWidth = nested[index]?.offsetWidth;
        // console.log(
        //   { totalWidth, containerWidth, menuItemWidth },
        //   nested[index],
        // );
        if (
          parseInt(totalWidth) + parseInt(menuItemWidth) <=
          parseInt(containerWidth)
        ) {
          fittingItems.push(item);
          totalWidth = parseInt(totalWidth) + parseInt(menuItemWidth);
          console.log(
            { containerWidth, menuItemWidth, totalWidth },
            nested[index],
            item.title,
          );
        } else {
          nonFittingItems.push(item);
        }
      });

      setFittingItems(fittingItems);
      setNonFittingItems(nonFittingItems);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [tocEntries, containerWidth]);
  // console.log({ fittingItems, nonFittingItems });
  const renderMenuItems = () => {
    // dropdown visible
    if (nonFittingItems.length > 0) {
      return (
        <>
          <RenderMenuItems items={fittingItems} />
          <Dropdown item text="More">
            <Dropdown.Menu>
              <RenderMenuItems items={nonFittingItems} />
            </Dropdown.Menu>
          </Dropdown>
        </>
      );
    } else {
      return <RenderMenuItems items={tocEntries} />;
    }
  };

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
      <Menu className="responsive-menu">{renderMenuItems()}</Menu>
    </>
  );
};

View.propTypes = {
  properties: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default injectIntl(View);
