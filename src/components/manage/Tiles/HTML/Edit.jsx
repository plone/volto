/**
 * Edit html tile.
 * @module components/manage/Tiles/HTML/Edit
 */

import React, { Component } from 'react';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-markup';
import { Button } from 'semantic-ui-react';

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
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   */
  constructor(props) {
    super(props);
    this.state = {
      code: this.props.data.html,
    }
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
        className={[
          'tile',
          this.props.selected && 'selected',
        ]
          .filter(e => !!e)
          .join(' ')}
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