import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { Menu, Dropdown } from 'semantic-ui-react';
import { FormattedMessage, injectIntl } from 'react-intl';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Slugger from 'github-slugger';

const RenderMenuItems = ({ mode, items }) => {
  return map(items, (item) => {
    const { id, level, title, override_toc, plaintext } = item;
    const slug = override_toc
      ? Slugger.slug(plaintext)
      : Slugger.slug(title) || id;
    return (
      item && (
        <React.Fragment key={id}>
          <Menu.Item className={`headline-${level}`}>
            {mode === 'edit' ? (
              <a href={`#${slug}`}>{title}</a>
            ) : (
              <AnchorLink href={`#${slug}`}>{title}</AnchorLink>
            )}
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
const View = ({ mode, data, tocEntries }) => {
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
      <Menu>
        <RenderMenuItems mode={mode} items={tocEntries} />
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
