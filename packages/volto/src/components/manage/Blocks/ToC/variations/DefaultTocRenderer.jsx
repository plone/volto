/**
 * View toc block.
 * @module components/manage/Blocks/ToC/View
 */

import PropTypes from 'prop-types';
import { map } from 'lodash';
import { List } from 'semantic-ui-react';
import Slugger from 'github-slugger';
import { UniversalLink } from '@plone/volto/components';
import { normalizeString } from '@plone/volto/helpers';

const RenderListItems = ({ items, data }) => {
  return map(items, (item) => {
    const { id, level, title, override_toc, plaintext } = item;
    const slug = override_toc
      ? Slugger.slug(normalizeString(plaintext))
      : Slugger.slug(normalizeString(title)) || id;
    return (
      item && (
        <List.Item key={id} className={`item headline-${level}`} as="li">
          <UniversalLink href={`#${slug}`}>{title}</UniversalLink>
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

const View = ({ data, tocEntries }) => {
  return (
    <>
      {data.title && !data.hide_title ? <h2>{data.title}</h2> : ''}
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

export default View;
