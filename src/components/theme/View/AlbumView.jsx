/**
 * Album view component.
 * @module components/theme/View/AlbumView
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container as SemanticContainer,
  GridColumn,
  Segment,
} from 'semantic-ui-react';
import { Button, Modal, Grid } from 'semantic-ui-react';
import { Icon, UniversalLink, PreviewImage } from '@plone/volto/components';
import config from '@plone/volto/registry';

import openSVG from '@plone/volto/icons/open.svg';
import aheadSVG from '@plone/volto/icons/ahead.svg';
import backSVG from '@plone/volto/icons/back.svg';

/**
 * Album view component class.
 * @function AlbumView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */
class AlbumView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openIndex: undefined,
    };

    this.closeModal = this.closeModal.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.prevImage = this.prevImage.bind(this);
  }

  closeModal() {
    this.setState({
      openIndex: -1,
    });
  }

  nextImage() {
    const openIndex =
      (this.state.openIndex + 1) % this.props.content.items.length;
    this.setState({
      openIndex,
    });
  }

  prevImage() {
    const openIndex =
      (this.state.openIndex - 1) % this.props.content.items.length;
    this.setState({
      openIndex,
    });
  }

  render() {
    const { content } = this.props;
    const Container =
      config.getComponent({ name: 'Container' }).component || SemanticContainer;

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
                  <React.Fragment key={item.url}>
                    {item.image_field && (
                      <Modal
                        className="gallery"
                        onClose={this.closeModal}
                        open={this.state.openIndex === index}
                        trigger={
                          <Grid.Column>
                            <Segment className="imageborder">
                              <PreviewImage
                                item={item}
                                alt={
                                  item.image_caption
                                    ? item.image_caption
                                    : item.title
                                }
                                onClick={() => {
                                  this.setState({
                                    openIndex: index,
                                  });
                                }}
                                className="ui middle aligned image"
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
                                  onClick={this.closeModal}
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
                                onClick={this.nextImage}
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
                                  alt={
                                    item.image_caption
                                      ? item.image_caption
                                      : item.title
                                  }
                                  onClick={() => {
                                    this.setState({
                                      openIndex: index,
                                    });
                                  }}
                                  size="large"
                                  className="ui image"
                                />

                                <Modal.Description>
                                  <p>{item.description}</p>
                                </Modal.Description>
                              </Modal.Content>
                            </Grid.Column>
                            <Grid.Column width={2} textAlign="center">
                              <Button
                                onClick={this.nextImage}
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
                  </React.Fragment>
                ))}
            </Grid>
          </section>
        </article>
      </Container>
    );
  }
}

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
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
