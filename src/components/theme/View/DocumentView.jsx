/**
 * Document view component.
 * @module components/theme/View/DocumentView
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {
  Accordion,
  Button,
  Container,
  Image,
  Transition,
} from 'semantic-ui-react';
import { filter, map, toPairs, groupBy } from 'lodash';
import { Icon } from '@plone/volto/components';
import {
  getTilesFieldname,
  getTilesLayoutFieldname,
  hasTilesData,
} from '@plone/volto/helpers';
import { settings, tiles } from '~/config';
import AnimateHeight from 'react-animate-height';

import upSVG from '@plone/volto/icons/up-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';

/**
 * Component to display the document view.
 * @function DocumentView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */
const DocumentView = ({ content }) => {
  const tilesFieldname = getTilesFieldname(content);
  const tilesLayoutFieldname = getTilesLayoutFieldname(content);
  const mostUsedTiles = filter(tiles.defaultTiles, item => item.mostUsed);
  const groupedTiles = groupBy(tiles.defaultTiles, item => item.group);
  const tilesAvailable = { mostUsed: mostUsedTiles, ...groupedTiles };
  const [activeAccIndex, setActiveAccIndex] = React.useState(0);

  function handleAccClick(e, titleProps) {
    const { index } = titleProps;
    const newIndex = activeAccIndex === index ? -1 : index;

    setActiveAccIndex(newIndex);
  }

  return hasTilesData(content) ? (
    <div id="page-document" className="ui wrapper">
      <Helmet title={content.title} />
      {map(content[tilesLayoutFieldname].items, tile => {
        let Tile = null;
        Tile =
          tiles.defaultTilesViewMap[content[tilesFieldname][tile]['@type']];
        return Tile !== null ? (
          <Tile
            key={tile}
            properties={content}
            data={content[tilesFieldname][tile]}
          />
        ) : (
          <div>{JSON.stringify(content[tilesFieldname][tile]['@type'])}</div>
        );
      })}
      <div className="tiles-chooser">
        <Accordion fluid styled className="form">
          {map(tiles.groupOrder, (groupName, index) => (
            <React.Fragment key={groupName}>
              <Accordion.Title
                active={activeAccIndex === index}
                index={index}
                onClick={handleAccClick}
              >
                {groupName}
                <div className="accordion-tools">
                  {activeAccIndex === 0 ? (
                    <Icon name={upSVG} size="20px" />
                  ) : (
                    <Icon name={downSVG} size="20px" />
                  )}
                </div>
              </Accordion.Title>
              <Accordion.Content
                className="tiles-list"
                active={activeAccIndex === index}
              >
                <AnimateHeight
                  animateOpacity
                  duration={500}
                  height={activeAccIndex === index ? 'auto' : 0}
                >
                  {map(tilesAvailable[groupName], tile => (
                    <Button.Group>
                      <Button icon basic>
                        <Icon name={tile.icon} size="36px" />
                        {tile.id}
                      </Button>
                    </Button.Group>
                  ))}
                </AnimateHeight>
              </Accordion.Content>
            </React.Fragment>
          ))}
        </Accordion>
      </div>
    </div>
  ) : (
    <Container id="page-document">
      <Helmet title={content.title} />
      <h1 className="documentFirstHeading">{content.title}</h1>
      {content.description && (
        <p className="documentDescription">{content.description}</p>
      )}
      {content.image && (
        <Image
          className="document-image"
          src={content.image.scales.thumb.download}
          floated="right"
        />
      )}
      {content.remoteUrl && (
        <span>
          The link address is:
          <a href={content.remoteUrl}>{content.remoteUrl}</a>
        </span>
      )}
      {content.text && (
        <div
          dangerouslySetInnerHTML={{
            __html: content.text.data.replace(
              /a href="([^"]*\.[^"]*)"/g,
              `a href="${settings.apiPath}$1/download/file"`,
            ),
          }}
        />
      )}
    </Container>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
DocumentView.propTypes = {
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

export default DocumentView;
