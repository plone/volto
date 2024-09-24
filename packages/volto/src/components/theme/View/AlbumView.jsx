import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Container as SemanticContainer,
  GridColumn,
  Segment,
} from 'semantic-ui-react';
import { Button, Modal, Grid } from 'semantic-ui-react';
import { Icon, UniversalLink } from '@plone/volto/components';
import config from '@plone/volto/registry';

import openSVG from '@plone/volto/icons/open.svg';
import aheadSVG from '@plone/volto/icons/ahead.svg';
import backSVG from '@plone/volto/icons/back.svg';

const AlbumView = ({ content }) => {
  const [openIndex, setOpenIndex] = useState(undefined);

  const closeModal = () => {
    setOpenIndex(-1);
  };

  const nextImage = () => {
    let OpenIndex = (openIndex + 1) % content.items.length;
    setOpenIndex(OpenIndex);
  };
  const prevImage = () => {
    const OpenIndex = (openIndex - 1) % content.items.length;
    setOpenIndex(OpenIndex);
  };
  const Container =
    config.getComponent({ name: 'Container' }).component || SemanticContainer;
  const PreviewImage = config.getComponent({ name: 'PreviewImage' }).component;
  return (
    <Container className="view-wrapper">
      <article id="content">
        <header>
          <h1 className="documentFirstHeading">{content.title}</h1>
          {content.description && (
            <p className="documentDescription">{content.description}</p>
          )}
        </header>
        <section id="content-core">
          <Grid doubling stackable columns={4}>
            {content.items &&
              content.items.map((item, index) => (
                <Fragment key={item.url}>
                  {item.image_field && (
                    <Modal
                      className="gallery"
                      onClose={closeModal}
                      open={openIndex === index}
                      trigger={
                        <Grid.Column>
                          <Segment className="imageborder">
                            <PreviewImage
                              item={item}
                              alt={item.image_caption || item.title}
                              onClick={() => {
                                setOpenIndex(index);
                              }}
                              className="ui middle aligned image"
                              responsive={true}
                              loading="lazy"
                              title={item.title}
                            />
                          </Segment>
                        </Grid.Column>
                      }
                      closeIcon
                    >
                      <Modal.Header>
                        <Grid>
                          <Grid.Row>
                            <GridColumn width={10}>{item.title}</GridColumn>
                            <GridColumn width={2} textAlign="right">
                              <UniversalLink
                                href={item.url}
                                title={item['@type']}
                                onClick={closeModal}
                              >
                                <Icon size="30px" fitted name={openSVG} />
                              </UniversalLink>
                            </GridColumn>
                          </Grid.Row>
                        </Grid>
                      </Modal.Header>
                      <Grid centered verticalAlign="middle">
                        <Grid.Row>
                          <Grid.Column width={2} textAlign="center">
                            <Button
                              className="gallery noborder"
                              onClick={prevImage}
                              style={{ margin: 0 }}
                            >
                              <Icon
                                name={backSVG}
                                className="circled"
                                size="30px"
                                style={{ margin: 0 }}
                              />
                            </Button>
                          </Grid.Column>
                          <Grid.Column width={8}>
                            <Modal.Content image>
                              <PreviewImage
                                item={item}
                                alt={item.image_caption}
                                onClick={() => {
                                  setOpenIndex(index);
                                }}
                                className="ui image"
                                responsive={true}
                              />

                              <Modal.Description>
                                <p>{item.description}</p>
                              </Modal.Description>
                            </Modal.Content>
                          </Grid.Column>
                          <Grid.Column width={2} textAlign="center">
                            <Button
                              onClick={nextImage}
                              className="gallery noborder"
                              style={{ margin: 0 }}
                            >
                              <Icon
                                name={aheadSVG}
                                className="circled"
                                size="30px"
                                style={{ margin: 0 }}
                              />
                            </Button>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Modal>
                  )}
                </Fragment>
              ))}
          </Grid>
        </section>
      </article>
    </Container>
  );
};

AlbumView.propTypes = {
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
     * Child items of the object
     */
    items: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * Title of the item
         */
        title: PropTypes.string,
        /**
         * Description of the item
         */
        description: PropTypes.string,
        /**
         * Url of the item
         */
        url: PropTypes.string,
        /**
         * Image of the item
         */
        image: PropTypes.object,
        /**
         * Image caption of the item
         */
        image_caption: PropTypes.string,
        /**
         * Type of the item
         */
        '@type': PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default AlbumView;
