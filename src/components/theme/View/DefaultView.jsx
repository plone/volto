/**
 * Document view component.
 * @module components/theme/View/DefaultView
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { Container, Segment, Grid, Label } from 'semantic-ui-react';
import config from '@plone/volto/registry';
import { getSchema } from '@plone/volto/actions';
import { getWidget } from '@plone/volto/helpers/Widget/utils';
import RenderBlocks from './RenderBlocks';

import { hasBlocksData, getBaseUrl } from '@plone/volto/helpers';
import { useDispatch, useSelector } from 'react-redux';

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

  React.useEffect(() => {
    content?.['@type'] &&
      !hasBlocksData(content) &&
      dispatch(getSchema(content['@type'], location.pathname));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return hasBlocksData(content) ? (
    <div id="page-document" className="ui container">
      <RenderBlocks {...props} path={path} />
    </div>
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
  );
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
