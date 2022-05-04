import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Segment } from 'semantic-ui-react';
import { doesNodeContainClick } from 'semantic-ui-react/dist/commonjs/lib';

// These absolute imports (without using the corresponding centralized index.js) are required
// to cut circular import problems, this file should never use them. This is because of
// the very nature of the functionality of the component and its relationship with others
import Icon from '@plone/volto/components/theme/Icon/Icon';

import clearSVG from '@plone/volto/icons/clear.svg';

import BlocksBrowserNav from './BlocksBrowserNav';

/**
 * BlocksBrowserBody container class.
 * @class BlocksBrowserBody
 * @extends Component
 */
class BlocksBrowserBody extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    block: PropTypes.string.isRequired,
    data: PropTypes.any.isRequired,
    closeObjectBrowser: PropTypes.func.isRequired,
    onChangeBlock: PropTypes.func.isRequired,
    onSelectItem: PropTypes.func,
    dataName: PropTypes.string,
    maximumSelectionSize: PropTypes.number,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    image: '',
    href: '',
    onSelectItem: null,
    dataName: null,
    selectableTypes: [],
    maximumSelectionSize: null,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);
    this.state = {
      selectedHref: this.props.data?.href || '',
    };
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside, false);
  }

  /**
   * Component will receive props
   * @method componentWillUnmount
   * @returns {undefined}
   */
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside, false);
  }

  handleClickOutside = (e) => {
    if (
      this.objectBrowser &&
      doesNodeContainClick(this.objectBrowser.current, e)
    )
      return;
    this.props.closeObjectBrowser();
  };

  objectBrowser = React.createRef();

  onSelectItem = (item) => {
    const { block, data, onChangeBlock } = this.props;
    const id = item['id'];
    if (this.props.onSelectItem) {
      this.props.onSelectItem(item);
    } else {
      onChangeBlock(block, {
        ...data,
        href: id,
      });
    }

    this.setState({
      selectedHref: id,
    });
  };

  onChangeBlockData = (key, value) => {
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      [key]: value,
    });
  };

  handleClickOnItem = (item) => {
    if (
      !this.props.maximumSelectionSize ||
      !this.props.data ||
      this.props.data.length < this.props.maximumSelectionSize
    ) {
      this.onSelectItem(item);
      let length = this.props.data ? this.props.data.length : 0;
      if (length + 1 >= this.props.maximumSelectionSize) {
        this.props.closeObjectBrowser();
      }
    } else {
      this.props.closeObjectBrowser();
    }
  };

  handleDoubleClickOnItem = (item) => {
    if (this.props.data.length < this.props.maximumSelectionSize) {
      this.onSelectItem(item);
    }
    this.props.closeObjectBrowser();
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return ReactDOM.createPortal(
      <aside
        role="presentation"
        onClick={(e) => {
          e.stopPropagation();
        }}
        ref={this.objectBrowser}
        key="objectbrowsercontainerkey"
        className="sidebar-container"
      >
        <Segment.Group raised>
          <header className="header pulled">
            <div className="vertical divider" />
            <h2>
              <FormattedMessage
                id="Choose Target"
                defaultMessage="Choose Target"
              />
            </h2>
            <button
              className="clearSVG"
              onClick={this.props.closeObjectBrowser}
            >
              <Icon name={clearSVG} size="24px" />
            </button>
          </header>
          <BlocksBrowserNav
            selected={false}
            handleClickOnItem={this.handleClickOnItem}
            handleDoubleClickOnItem={this.handleDoubleClickOnItem}
          />
        </Segment.Group>
      </aside>,
      document.body,
    );
  }
}

export default compose(injectIntl)(BlocksBrowserBody);
