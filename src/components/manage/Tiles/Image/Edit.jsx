/**
 * Edit image tile.
 * @module components/manage/Tiles/Title/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { readAsDataURL } from 'promise-file-reader';
import { Button, Icon, Image, Message } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';

import { createContent } from '../../../../actions';
import { getBaseUrl } from '../../../../helpers';

@injectIntl
@connect(
  state => ({
    request: state.content.create,
    content: state.content.data,
  }),
  dispatch => bindActionCreators({ createContent }, dispatch),
)
/**
 * Edit image tile class.
 * @class Edit
 * @extends Component
 */
export default class Edit extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    selected: PropTypes.bool.isRequired,
    tile: PropTypes.string.isRequired,
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    content: PropTypes.objectOf(PropTypes.any).isRequired,
    intl: intlShape.isRequired,
    request: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    pathname: PropTypes.string.isRequired,
    onChangeTile: PropTypes.func.isRequired,
    onSelectTile: PropTypes.func.isRequired,
    onDeleteTile: PropTypes.func.isRequired,
    createContent: PropTypes.func.isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);

    this.onUploadImage = this.onUploadImage.bind(this);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.request.loading && nextProps.request.loaded) {
      this.props.onChangeTile(this.props.tile, {
        ...this.props.data,
        url: nextProps.content['@id'],
      });
    }
  }

  /**
   * Upload image handler
   * @method onUploadImage
   * @returns {undefined}
   */
  onUploadImage({ target }) {
    const file = target.files[0];
    readAsDataURL(file).then(data => {
      const fields = data.match(/^data:(.*);(.*),(.*)$/);
      this.props.createContent(getBaseUrl(this.props.pathname), {
        '@type': 'Image',
        image: {
          data: fields[3],
          encoding: fields[2],
          'content-type': fields[1],
          filename: file.name,
        },
      });
    });
  }

  /**
   * Upload image handler
   * @method onUploadImage
   * @param {string} align Alignment option
   * @returns {undefined}
   */
  onAlignTile(align) {
    console.log(align);
    this.props.onChangeTile(this.props.tile, {
      ...this.props.data,
      align,
    });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <div
        onClick={() => this.props.onSelectTile(this.props.tile)}
        className={[
          'tile',
          'image',
          'align',
          this.props.selected && 'selected',
          this.props.data.align,
        ]
          .filter(e => !!e)
          .join(' ')}
      >
        {this.props.selected && (
          <div className="toolbar">
            <Button.Group>
              <Button
                icon
                basic
                onClick={this.onAlignTile.bind(this, 'left')}
                active={this.props.data.align === 'left'}
              >
                <Icon name="align left" />
              </Button>
            </Button.Group>
            <Button.Group>
              <Button
                icon
                basic
                onClick={this.onAlignTile.bind(this, 'right')}
                active={this.props.data.align === 'right'}
              >
                <Icon name="align right" />
              </Button>
            </Button.Group>
            <Button.Group>
              <Button
                icon
                basic
                onClick={this.onAlignTile.bind(this, 'center')}
                active={
                  this.props.data.align === 'center' || !this.props.data.align
                }
              >
                <Icon name="align center" />
              </Button>
            </Button.Group>
            <Button.Group>
              <Button
                icon
                basic
                onClick={this.onAlignTile.bind(this, 'full')}
                active={this.props.data.align === 'full'}
              >
                <Icon name="align justify" />
              </Button>
            </Button.Group>
            <Button.Group>
              <Button
                icon
                basic
                onClick={() => this.props.onDeleteTile(this.props.tile)}
              >
                <Icon name="trash" />
              </Button>
            </Button.Group>
          </div>
        )}
        {this.props.data.url ? (
          <p>
            <Image src={`${this.props.data.url}/@@images/image`} alt="" />
          </p>
        ) : (
          <p>
            <Message>
              <center>
                <h4>Image</h4>
                <p>Upload a new image</p>
                <p>
                  <label className="ui button file">
                    Browse
                    <input
                      type="file"
                      onChange={this.onUploadImage}
                      style={{ display: 'none' }}
                    />
                  </label>
                </p>
              </center>
            </Message>
          </p>
        )}
      </div>
    );
  }
}
