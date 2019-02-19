/**
 * Edit html tile.
 * @module components/manage/Tiles/HTML/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-markup';
import { Button } from 'semantic-ui-react';
import cx from 'classnames';

import './styles.css';

import { Icon } from '../../../../components';
import trashSVG from '../../../../icons/delete.svg';

/**
 * Edit html tile class.
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
    onChangeTile: PropTypes.func.isRequired,
    onSelectTile: PropTypes.func.isRequired,
    onDeleteTile: PropTypes.func.isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   */
  constructor(props) {
    super(props);
    this.state = {
      code: this.props.data.html || '',
    };
  }

  /**
   * Change html handler
   * @method onChangeUrl
   * @param {string} code New value html
   * @returns {undefined}
   */
  onChange(code) {
    this.props.onChangeTile(this.props.tile, {
      ...this.props.data,
      html: code,
    });
    this.setState({ code });
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
        className={cx('tile html', {
          selected: this.props.selected,
        })}
      >
        <Editor
          value={this.state.code}
          placeholder={`<p>Add some HTML here</p>`}
          onValueChange={code => this.onChange(code)}
          highlight={code => highlight(code, languages.html)}
          padding={8}
          className="html-editor"
        />
        {this.props.selected && (
          <Button
            icon
            basic
            onClick={() => this.props.onDeleteTile(this.props.tile)}
            className="tile-delete-button"
          >
            <Icon name={trashSVG} size="18px" />
          </Button>
        )}
      </div>
    );
  }
}
