/**
 * View toc block.
 * @module components/manage/Blocks/ToC/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { List } from 'semantic-ui-react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Slugger from 'github-slugger';

const RenderListItems = ({ items, data }) => {
  const history = useHistory();

  return map(items, (item) => {
    const { id, level, title, override_toc, plaintext } = item;
    const slug = override_toc
      ? Slugger.slug(plaintext)
      : Slugger.slug(title) || id;
    return (
      item && (
        <List.Item key={id} className={`item headline-${level}`} as="li">
          <AnchorLink
            href={`#${slug}`}
            onClick={(e) => {
              history.push({ hash: slug });
            }}
          >
            {title}
          </AnchorLink>
          {item.items?.length > 0 && (
            <List
              ordered={data.ordered}
              bulleted={!data.ordered}
              as={data.ordered ? 'ol' : 'ul'}
            >
              <RenderListItems items={item.items} data={data} />
            </List>
          )}
        </List.Item>
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
      <List
        ordered={data.ordered}
        bulleted={!data.ordered}
        as={data.ordered ? 'ol' : 'ul'}
      >
        <RenderListItems items={tocEntries} data={data} />
      </List>
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
