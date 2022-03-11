import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Grid, Ref } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import cx from 'classnames';
import { withRouter } from 'react-router-dom';
import { Icon, SidebarPortal } from '@plone/volto/components';
import { withBlockExtensions } from '@plone/volto/helpers';

import addSVG from '@plone/volto/icons/add.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import configSVG from '@plone/volto/icons/configuration.svg';

import BlockRenderer from '@plone/volto/components/manage/BlockRenderer/BlockRenderer';
import TemplateChooser from '@plone/volto/components/manage/TemplateChooser/TemplateChooser';

import NewBlockAddButton from './NewBlockAddButton';
import GridData from './Data';

import { reorderArray, replaceItemOfArray } from './Utils';

import templates from './templates';

import config from '@plone/volto/registry';

function getAllowedBlocks(type) {
  return config.blocks.blocksConfig?.[type]?.gridAllowedBlocks;
}

/**
 * Edit image block class.
 * @class Edit
 * @extends Component
 */
class RowEdit extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    selected: PropTypes.bool.isRequired,
    block: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    content: PropTypes.objectOf(PropTypes.any).isRequired,
    request: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    pathname: PropTypes.string.isRequired,
    onChangeBlock: PropTypes.func.isRequired,
    onSelectBlock: PropTypes.func.isRequired,
    onDeleteBlock: PropTypes.func.isRequired,
    onFocusPreviousBlock: PropTypes.func.isRequired,
    onFocusNextBlock: PropTypes.func.isRequired,
    handleKeyDown: PropTypes.func.isRequired,
  };

  state = {
    selectedColumnIndex: 0,
    droppableId: uuid(),
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);

    this.onChangeBlock = this.onChangeBlock.bind(this);

    // sets defaults
    if (!this.props.data.columns) {
      this.props.onChangeBlock(this.props.block, {
        ...this.props.data,
        columns: [],
      });
    }
  }

  onChangeGridItem = (index, gridItemData) => {
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      columns: replaceItemOfArray(this.props.data.columns, index, {
        ...this.props.data.columns[index],
        ...gridItemData,
      }),
    });
  };

  /**
   * Align block handler
   * @method onAlignBlock
   * @param {string} align Alignment option
   * @returns {undefined}
   */
  onAlignBlock(align) {
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      align,
    });
  }

  onDragEnd = (result) => {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const columns = reorderArray(
      this.props.data.columns,
      source.index,
      destination.index,
    );

    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      columns,
    });

    this.onChangeSelectedColumnItem(destination.index);
  };

  /**
   * Change inner blocks handler
   * @method onChangeBlock
   * @param {object} editorState Editor state.
   * @param {number} index Editor card index
   * @returns {undefined}
   */
  onChangeBlock(data, index) {
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      columns: replaceItemOfArray(this.props.data.columns, index, {
        ...this.props.data.columns[index],
        ...data,
      }),
    });
  }

  addNewColumn = (e) => {
    e.stopPropagation();
    const type =
      getAllowedBlocks(this.props.data['@type'])?.length === 1
        ? getAllowedBlocks(this.props.data['@type'])[0]
        : null;
    const newColumnsState = [
      ...this.props.data.columns,
      {
        id: uuid(),
        ...(type && { '@type': type }),
      },
    ];
    if (this.props.data.columns.length < 4) {
      this.props.onChangeBlock(this.props.block, {
        ...this.props.data,
        columns: newColumnsState,
      });
    }
  };

  removeColumn = (e, index) => {
    e.stopPropagation();
    const newColumnsState = this.props.data.columns.filter(
      (item, i) => i !== index,
    );
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      columns: newColumnsState,
    });
  };

  clearColumn = (e, index) => {
    e.stopPropagation();
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      columns: replaceItemOfArray(this.props.data.columns, index, {
        ...this.props.data.columns[index],
        url: '',
      }),
    });
  };

  onChangeColumnSettings = (e, index, key, value) => {
    e.stopPropagation();
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      columns: replaceItemOfArray(this.props.data.columns, index, {
        ...this.props.data.columns[index],
        [key]: value,
      }),
    });
  };

  onSelectTemplate = (templateIndex) => {
    const resultantTemplates =
      getAllowedBlocks(this.props.data['@type'])?.length === 1
        ? templates(getAllowedBlocks(this.props.data['@type'])[0])
        : templates();
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      columns: resultantTemplates(this.props.intl)[templateIndex].columns,
    });
  };

  onChangeSelectedColumnItem = (index) =>
    this.setState({ selectedColumnIndex: index });

  node = React.createRef();

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { data } = this.props;

    return (
      <>
        {this.props.selected && (
          <div className="toolbar">
            <Button.Group>
              <Button
                aria-label={`Add grid element`}
                icon
                basic
                onClick={(e) => this.addNewColumn(e)}
              >
                <Icon name={addSVG} size="24px" />
              </Button>
            </Button.Group>
            <Button.Group>
              <Button
                aria-label={`Select grid block`}
                icon
                basic
                onClick={(e) => {
                  e.stopPropagation();
                  this.setState({ selectedColumnIndex: null });
                  this.node.current.focus();
                }}
              >
                <Icon name={configSVG} size="24px" />
              </Button>
            </Button.Group>
          </div>
        )}
        <div
          className={cx({
            [data['@type']]: true,
            one: data?.columns && data.columns.length === 1,
            two: data?.columns && data.columns.length === 2,
            three: data?.columns && data.columns.length === 3,
            four: data?.columns && data.columns.length === 4,
          })}
          // This is required to enabling a small "in-between" clickable area
          // for bringing the Grid sidebar alive once you have selected an inner block
          onClick={(e) => {
            this.setState({ selectedColumnIndex: null });
            this.node.current.focus();
          }}
          // Custom own focus management
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              this.props.onAddBlock(
                config.settings.defaultBlockType,
                this.props.index + 1,
              );
            }
            if (e.key === 'ArrowUp') {
              this.props.onFocusPreviousBlock(
                this.props.id,
                this.props.blockNode.current,
              );
              e.preventDefault();
            }
            if (e.key === 'ArrowDown') {
              this.props.onFocusNextBlock(
                this.props.id,
                this.props.blockNode.current,
              );
              e.preventDefault();
            }
          }}
          ref={this.node}
          role="presentation"
          style={{ outline: 'none' }}
          // The tabIndex is required for the keyboard navigation and for making the element interactive
          /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
          tabIndex="0"
        >
          {this.props.data.columns && this.props.data.headline && (
            <h2 className="headline">{data.headline}</h2>
          )}

          {!this.props.data.columns?.length && (
            <TemplateChooser
              templates={
                getAllowedBlocks(this.props.data['@type'])?.length === 1
                  ? templates(getAllowedBlocks(this.props.data['@type'])[0])
                  : templates()
              }
              onSelectTemplate={this.onSelectTemplate}
            />
          )}
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable
              droppableId={this.state.droppableId}
              direction="horizontal"
            >
              {(provided) => (
                <Ref innerRef={provided.innerRef}>
                  <Grid
                    stackable
                    stretched
                    {...provided.droppableProps}
                    columns={
                      this.props.data.columns
                        ? this.props.data.columns.length
                        : 0
                    }
                  >
                    {this.props.data.columns &&
                      this.props.data.columns.map((item, index) => (
                        <Draggable
                          draggableId={item.id}
                          index={index}
                          key={item.id}
                        >
                          {(provided) => {
                            item = { ...item, block: item.id };
                            return (
                              <Ref innerRef={provided.innerRef}>
                                <Grid.Column
                                  className={`grid-block-${item['@type']}`}
                                  key={item.id}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div
                                    className={cx('renderer-wrapper', {
                                      empty: !item['@type'],
                                      selected:
                                        this.props.selected &&
                                        this.state.selectedColumnIndex ===
                                          index,
                                    })}
                                    role="presentation"
                                    // This prevents propagation of ENTER
                                    onKeyDown={(e) => e.stopPropagation()}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      this.props.onSelectBlock(
                                        this.props.block,
                                      );
                                      this.onChangeSelectedColumnItem(index);
                                    }}
                                  >
                                    <Button
                                      aria-label={`Remove grid element ${index}`}
                                      basic
                                      icon
                                      onClick={(e) =>
                                        this.removeColumn(e, index)
                                      }
                                      className="remove-block-button"
                                    >
                                      <Icon
                                        name={clearSVG}
                                        className="circled"
                                        size="24px"
                                      />
                                    </Button>
                                    {item['@type'] ? (
                                      <BlockRenderer
                                        {...this.props}
                                        block={item.id}
                                        edit
                                        type={item['@type']}
                                        selected={
                                          this.props.selected &&
                                          this.state.selectedColumnIndex ===
                                            index
                                        }
                                        onChangeBlock={(block, data) => {
                                          this.onChangeGridItem(index, data);
                                        }}
                                        data={this.props.data.columns[index]}
                                      />
                                    ) : (
                                      <div className="uber-grid-default-item">
                                        <p>Add a new block</p>
                                        <NewBlockAddButton
                                          block={this.props.blocks}
                                          index={index}
                                          onChangeGridItem={
                                            this.onChangeGridItem
                                          }
                                          allowedBlocks={getAllowedBlocks(
                                            this.props.data['@type'],
                                          )}
                                        />
                                      </div>
                                    )}
                                  </div>
                                </Grid.Column>
                              </Ref>
                            );
                          }}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </Grid>
                </Ref>
              )}
            </Droppable>
          </DragDropContext>
          <SidebarPortal
            selected={
              this.props.selected &&
              !this.state.selectedColumnIndex &&
              this.state.selectedColumnIndex !== 0
            }
          >
            <GridData {...this.props}></GridData>
          </SidebarPortal>
        </div>
      </>
    );
  }
}

export default compose(
  injectIntl,
  withRouter,
  withBlockExtensions,
  connect(
    (state) => ({
      request: state.content.create,
      content: state.content.data,
    }),
    {},
  ),
)(RowEdit);
