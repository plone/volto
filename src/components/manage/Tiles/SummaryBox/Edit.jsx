/**
 * Edit text tile.
 * @module components/manage/Tiles/Title/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Card, Dropdown, Image } from 'semantic-ui-react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { map, sortBy, get } from 'lodash';

import {
  getSummaryBoxContent,
  getSummaryBoxSearchResults,
  resetSummaryBoxContent,
  resetSummaryBoxSearch,
} from '../../../../actions';

import { Icon } from '../../../../components';
import trashSVG from '../../../../icons/delete.svg';

const messages = defineMessages({
  no_results_found: {
    id: 'No results found.',
    defaultMessage: 'No results found.',
  },
  search: {
    id: 'Search',
    defaultMessage: 'Search',
  },
});

@injectIntl
@connect(
  state => ({
    content: state.summaryBox.content,
    search: state.summaryBox.items,
  }),
  dispatch =>
    bindActionCreators(
      {
        getSummaryBoxContent,
        resetSummaryBoxSearch,
        getSummaryBoxSearchResults,
        resetSummaryBoxContent,
      },
      dispatch,
    ),
)
/**
 * Edit text tile class.
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
    intl: intlShape.isRequired,
    onChangeTile: PropTypes.func.isRequired,
    onSelectTile: PropTypes.func.isRequired,
    onDeleteTile: PropTypes.func.isRequired,
    getSummaryBoxContent: PropTypes.func.isRequired,
    resetSummaryBoxContent: PropTypes.func.isRequired,
    resetSummaryBoxSearch: PropTypes.func.isRequired,
    getSummaryBoxSearchResults: PropTypes.func.isRequired,
    search: PropTypes.arrayOf(
      PropTypes.shape({
        '@id': PropTypes.string,
        title: PropTypes.string,
      }),
    ),
    content: PropTypes.objectOf(PropTypes.any),
  };

  static defaultProps = {
    content: {},
    search: [],
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs SummaryBoxEditor
   */
  constructor(props) {
    super(props);

    if (!__SERVER__) {
      this.state = {
        url: '',
        image: '',
        title: '',
        description: '',
      };
    }
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.resetSummaryBoxSearch();
    this.updateContent();
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Props that will be received
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.content).length) {
      this.setState({
        url: nextProps.content['@id'],
        image: get(nextProps.content, 'image.scales.mini.download', undefined),
        title: nextProps.content.title,
        description: nextProps.content.description,
      });
    }
  }

  /**
   * Component did update. Here we fetch new content if needed.
   * @method componentDidUpdate
   * @param {Object} prevProps Props before update
   * @param {Object} prevState State before update
   * @returns {undefined}
   */
  componentDidUpdate(prevProps) {
    if (prevProps.data.selectedItem !== this.props.data.selectedItem) {
      this.updateContent();
    }
  }

  /**
   * Component will unmount. Reset loaded content.
   * @method componentWillUnmount
   * @returns {undefined}
   */
  componentWillUnmount() {
    this.props.resetSummaryBoxContent();
  }

  /**
   * Change handler
   * @method onChange
   * @param {string} value Value
   * @returns {undefined}
   */
  onChange = value => {
    if (value) {
      this.props.getSummaryBoxSearchResults('', {
        Title: `*${value}*`,
      });
    } else {
      this.props.resetSummaryBoxSearch();
    }
  };

  /**
   * Select item handler
   * @method onSelectItem
   * @param {string} value Search term
   * @returns {undefined}
   */
  onSelectItem = value => {
    this.props.onChangeTile(this.props.tile, {
      ...this.props.data,
      selectedItem: value,
    });
  };

  /**
   * Fetches proxied content.
   * @method updateContent
   * @returns {undefined}
   */
  updateContent = () => {
    const { selectedItem } = this.props.data;
    if (selectedItem) {
      this.props.getSummaryBoxContent(selectedItem);
    }
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (__SERVER__) {
      return <div />;
    }
    const { url, image, title, description } = this.state;

    return (
      <div
        onClick={() => this.props.onSelectTile(this.props.tile)}
        className={`tile summary-box${this.props.selected ? ' selected' : ''}`}
        ref={node => {
          this.ref = node;
        }}
      >
        {/* Widget that searches for a reference */}
        {this.props.selected && (
          <div className="toolbar" style={{ width: '400px' }}>
            <Dropdown
              options={sortBy(
                map(this.props.search, result => ({
                  key: result['@id'],
                  value: result['@id'],
                  text: result.title,
                })),
                'text',
              )}
              placeholder={this.props.intl.formatMessage(messages.search)}
              search
              selection
              fluid
              noResultsMessage={this.props.intl.formatMessage(
                messages.no_results_found,
              )}
              onChange={(event, data) => this.onSelectItem(data.value)}
              onSearchChange={(event, data) => this.onChange(data.searchQuery)}
            />
          </div>
        )}
        {/* Show selected item */}
        {url && (
          <Card>
            {image && <Image clearing src={image} alt={title} />}
            <Card.Content>
              <Card.Header>{title}</Card.Header>
              <Card.Description>{description}</Card.Description>
            </Card.Content>
          </Card>
        )}
        {/* "Delete tile" button */}
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
