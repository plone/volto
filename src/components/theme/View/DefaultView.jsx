/**
 * Document view component.
 * @module components/theme/View/DefaultView
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import {
  Container as SemanticContainer,
  Segment,
  Grid,
  Label,
} from 'semantic-ui-react';
import config from '@plone/volto/registry';
import { getSchema } from '@plone/volto/actions';
import { getWidget } from '@plone/volto/helpers/Widget/utils';
import RenderBlocks from './RenderBlocks';

import { hasBlocksData, getBaseUrl } from '@plone/volto/helpers';
import { useDispatch, useSelector } from 'react-redux';

import { isEqual } from 'lodash';

/**
 * Component to display the default view.
 * @function DefaultView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */
const DefaultView = (props) => {
  const { content, location } = props;
  const path = getBaseUrl(location?.pathname || '');
  const dispatch = useDispatch();
  const { views } = config.widgets;
  const contentSchema = useSelector((state) => state.schema?.schema);
  const fieldsetsToExclude = [
    'categorization',
    'dates',
    'ownership',
    'settings',
  ];
  const fieldsets = contentSchema?.fieldsets.filter(
    (fs) => !fieldsetsToExclude.includes(fs.id),
  );

  // TL;DR: There is a flash of the non block-based view because of the reset
  // of the content on route change. Subscribing to the content change at this
  // level has nasty implications, so we can't watch the Redux state for loaded
  // content flag here (because it forces an additional component update)
  // Instead, we can watch if the content is "empty", but this has a drawback
  // since the locking mechanism inserts a `lock` key before the content is there.
  // So "empty" means `content` is present, but only with a `lock` key, thus the next
  // ugly condition comes to life
  const contentLoaded = content && !isEqual(Object.keys(content), ['lock']);

  React.useEffect(() => {
    content?.['@type'] &&
      !hasBlocksData(content) &&
      dispatch(getSchema(content['@type'], location.pathname));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Container =
    config.getComponent({ name: 'Container' }).component || SemanticContainer;

  // If the content is not yet loaded, then do not show anything
  return contentLoaded ? (
    hasBlocksData(content) ? (
      <Container id="page-document">
        <RenderBlocks {...props} path={path} />
      </Container>
    ) : (
      <Container id="page-document">
        {fieldsets?.map((fs) => {
          return (
            <div className="fieldset" key={fs.id}>
              {fs.id !== 'default' && <h2>{fs.title}</h2>}
              {fs.fields?.map((f, key) => {
                let field = {
                  ...contentSchema?.properties[f],
                  id: f,
                  widget: getWidget(f, contentSchema?.properties[f]),
                };
                let Widget = views?.getWidget(field);
                return f !== 'title' ? (
                  <Grid celled="internally" key={key}>
                    <Grid.Row>
                      <Label>{field.title}:</Label>
                    </Grid.Row>
                    <Grid.Row>
                      <Segment basic>
                        <Widget value={content[f]} />
                      </Segment>
                    </Grid.Row>
                  </Grid>
                ) : (
                  <Widget key={key} value={content[f]} />
                );
              })}
            </div>
          );
        })}
      </Container>
    )
  ) : null;
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
DefaultView.propTypes = {
  /**
   * Content of the object
   */
  content: PropTypes.shape({
    /**
     * Title of the object
     */
    title: PropTypes.string,
    /**
     * Description of the object
     */
    description: PropTypes.string,
    /**
     * Text of the object
     */
    text: PropTypes.shape({
      /**
       * Data of the text of the object
       */
      data: PropTypes.string,
    }),
  }).isRequired,
};

export default injectIntl(DefaultView);
