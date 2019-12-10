/**
 * Album view component.
 * @module components/theme/View/AlbumView
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from '@plone/volto/helpers';
import { Link } from 'react-router-dom';
import { Card, Container, Image, Icon } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import { Button, Header, Modal } from 'semantic-ui-react';

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

    this.nextImage = this.nextImage.bind(this);
    this.prevImage = this.prevImage.bind(this);
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
    console.log(this.state);
    return (
      <Container className="view-wrapper">
        <Helmet title={content.title} />
        <article id="content">
          <header>
            <h1 className="documentFirstHeading">{content.title}</h1>
            {content.description && (
              <p className="documentDescription">{content.description}</p>
            )}
          </header>
          <section id="content-core">
            <Image.Group size="small">
              {content.items.map((item, index) => (
                <span key={item.url}>
                  {item.image && (
                    <Modal
                      open={this.state.openIndex === index}
                      trigger={
                        <Image
                          alt={
                            item.image_caption ? item.image_caption : item.title
                          }
                          src={item.image.scales.thumb.download}
                          onClick={() => {
                            this.setState({
                              openIndex: index,
                            });
                          }}
                        />
                      }
                    >
                      <Modal.Header>{item.title}</Modal.Header>
                      <button onClick={this.nextImage}>
                        <Icon name="left arrow" />
                      </button>
                      <Modal.Content image>
                        <Image
                          wrapped
                          size="large"
                          alt={
                            item.image_caption ? item.image_caption : item.title
                          }
                          src={item.image.scales.large.download}
                        />
                        <Modal.Description>
                          <p>{item.description}</p>
                        </Modal.Description>
                      </Modal.Content>
                      <button onClick={this.nextImage}>
                        <Icon name="right arrow" />
                      </button>
                    </Modal>
                  )}
                  <Link to={item.url} title={item['@type']}>
                    {item.title}
                  </Link>
                </span>
              ))}
            </Image.Group>
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
