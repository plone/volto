/**
 * Album view component.
 * @module components/theme/View/AlbumView
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { Card, Image } from 'semantic-ui-react';

/**
 * AlbumView view component class.
 * @class AlbumView
 * @extends Component
 */
export default class AlbumView extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    content: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          description: PropTypes.string,
          url: PropTypes.string,
          image: PropTypes.object,
          '@type': PropTypes.string,
        }),
      ),
    }).isRequired,
    renderCardHeader: PropTypes.func,
    renderCardDescription: PropTypes.func,
    renderCardExtra: PropTypes.func,
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    renderCardHeader: item => <Card.Header content={item.title} />,
    renderCardDescription: item => (
      <Card.Description content={item.description} />
    ),
    renderCardExtra: () => null,
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <div id="page-home">
        <Helmet title={this.props.content.title} />
        <article id="content">
          <header>
            <h1 className="documentFirstHeading">{this.props.content.title}</h1>
            {this.props.content.description && (
              <p className="description">{this.props.content.description}</p>
            )}
          </header>
          <section id="content-core">
            <Card.Group stackable doubling>
              {this.props.content.items.map(item => (
                <Card
                  as={Link}
                  to={item.url}
                  title={item.title}
                  key={item.url}
                  centered
                >
                  <div className="image-wrapper">
                    {item.image && (
                      <Image
                        src={item.image.scales.preview.download}
                        alt={
                          item.image_caption ? item.image_caption : item.title
                        }
                      />
                    )}
                  </div>
                  <Card.Content
                    header={this.props.renderCardHeader(item)}
                    description={this.props.renderCardDescription(item)}
                    textAlign="center"
                  />
                  {this.props.renderCardExtra(item)}
                </Card>
              ))}
              {/* Workaround while Flexbox 2.0 doesn't implement last row alignment */}
              {[...Array(3)].map((e, i) => <Card key={`item-${i}`} />)}
            </Card.Group>
          </section>
        </article>
      </div>
    );
  }
}
