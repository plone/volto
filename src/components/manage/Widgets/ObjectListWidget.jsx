import { map } from 'lodash';
import {
  Button,
  Form,
  Grid,
  Icon,
  Input,
  Label,
  Modal,
  Segment,
} from 'semantic-ui-react';
import React, { Fragment, useState } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Icon as VoltoIcon } from '@plone/volto/components';

import deleteSVG from '@plone/volto/icons/delete.svg';
import addSVG from '@plone/volto/icons/add.svg';

import ObjectWidget from './ObjectWidget';

// TODO: make the ObjectWidget and ObjectListWidget (at least keyboard) accessible (e.g. Esc should close the Modal)
// - see: https://github.com/Semantic-Org/Semantic-UI/issues/5053

const messages = defineMessages({
  add: {
    id: 'Add {schemaTitle}',
    defaultMessage: 'Add {schemaTitle}',
  },
  save: {
    id: 'Save',
    defaultMessage: 'Save',
  },
  delete: {
    id: 'Delete',
    defaultMessage: 'Delete',
  },
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
  edit: {
    id: 'Edit',
    defaultMessage: 'Edit',
  },
  count: {
    id: 'A collection of {count} items',
    defaultMessage: 'A collection of {count} items',
  },
});

export const FlatObjectList = injectIntl(
  ({ id, value = [], schema, onChange, intl }) => {
    return (
      <div className="objectlist-widget-content">
        {value.map((obj, index) => (
          // TODO: notice that the Fragment key={} might cause problems, need to test
          <Fragment key={index}>
            <Grid>
              <Grid.Column width={11}>
                <Segment>
                  <ObjectWidget
                    id={`${id}-${index}`}
                    key={index}
                    schema={schema}
                    value={obj}
                    onChange={(fi, fv) => {
                      const newvalue = value.map((v, i) =>
                        i !== index ? v : fv,
                      );
                      onChange(id, newvalue);
                    }}
                  />
                </Segment>
              </Grid.Column>
              <Grid.Column width={1}>
                <Button.Group>
                  <Button
                    basic
                    circular
                    size="mini"
                    title={intl.formatMessage(messages.delete)}
                    aria-label={intl.formatMessage(messages.delete)}
                    onClick={() =>
                      onChange(
                        id,
                        value.filter((v, i) => i !== index),
                      )
                    }
                  >
                    {/* TODO: instead of px use rem if possible */}
                    <VoltoIcon size="20px" name={deleteSVG} />
                  </Button>
                </Button.Group>
              </Grid.Column>
            </Grid>
          </Fragment>
        ))}
      </div>
    );
  },
);

export const useScrollToBottomAutomatically = (modalContentRef, stateValue) => {
  React.useEffect(() => {
    if (modalContentRef.current && modalContentRef.current.scrollIntoView) {
      modalContentRef.current.scrollIntoView({
        block: 'end',
      });
    }
  }, [modalContentRef, stateValue]);
};

export const ModalObjectListForm = injectIntl((props) => {
  const {
    open,
    title,
    className,
    onSave,
    onCancel,
    schema,
    value = [],
    id,
    intl,
  } = props;

  const [stateValue, setStateValue] = useState(value);
  const modalContentRef = React.useRef(null);

  useScrollToBottomAutomatically(modalContentRef, stateValue);

  const createEmpty = React.useCallback(() => {
    return {};
  }, []);

  /**
   * For when `value` is updated outside of the Modal and the Modal is reopened after that.
   * (The current behaviour is that the contents of the reopened Modal are not updated.)
   **/
  React.useEffect(() => {
    setStateValue(value);
  }, [value]);

  let jsx = (
    <Modal open={open} className={className}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content scrolling>
        <div ref={modalContentRef} data-testid="modal-content">
          <FlatObjectList
            id={id}
            value={stateValue}
            schema={schema}
            onChange={(id, v) => {
              setStateValue(v);
            }}
          />
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button
          primary
          basic
          circular
          floated="left"
          size="big"
          className="icon"
          title={intl.formatMessage(messages.add, {
            schemaTitle: schema.title,
          })}
          aria-label={intl.formatMessage(messages.add, {
            schemaTitle: schema.title,
          })}
          onClick={() => {
            setStateValue([...stateValue, createEmpty()]);
          }}
        >
          {/* TODO: instead of px use rem if possible */}
          <VoltoIcon size="18px" name={addSVG} />
          Add {schema.title}
        </Button>

        <Button
          basic
          circular
          primary
          floated="right"
          icon="arrow right"
          title={intl.formatMessage(messages.save)}
          aria-label={intl.formatMessage(messages.save)}
          size="big"
          onClick={() => {
            onSave(id, stateValue);
          }}
        />
        <Button
          basic
          circular
          secondary
          icon="remove"
          title={intl.formatMessage(messages.cancel)}
          aria-label={intl.formatMessage(messages.cancel)}
          floated="right"
          size="big"
          onClick={() => {
            setStateValue([...value]);
            onCancel();
          }}
        />
      </Modal.Actions>
    </Modal>
  );

  return jsx;
});

export const ObjectListWidget = injectIntl(
  (props) => {
    const {
      id,
      value = [],
      schema,
      onChange,
      required,
      error,
      fieldSet,
      title,
      description,
      onDelete,
      onEdit,
      intl,
    } = props;

    const [open, setOpen] = useState(false);

    return (
      <>
        <ModalObjectListForm
          id={id}
          schema={schema}
          title={title}
          value={value}
          open={open}
          onSave={(id, val) => {
            onChange(id, val);
            setOpen(false);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <Form.Field
          onClick={(e) => {
            e.preventDefault();
          }}
          inline
          required={required}
          error={(error || []).length > 0}
          className={description ? 'help text' : 'text'}
          id={`${fieldSet || 'field'}-${id}`}
        >
          <Grid>
            <Grid.Row stretched>
              <Grid.Column width="4">
                <div className="wrapper">
                  <label htmlFor={`field-${id}`}>
                    <i
                      aria-hidden="true"
                      className="grey bars icon drag handle"
                    />
                    {title}
                  </label>
                </div>
              </Grid.Column>
              <Grid.Column width="8">
                <Input
                  id={`field-${id}`}
                  name={id}
                  disabled={true}
                  value={intl.formatMessage(messages.count, {
                    count: value.length,
                  })}
                />

                <div className="toolbar">
                  <Button
                    aria-label={intl.formatMessage(messages.edit)}
                    title={intl.formatMessage(messages.edit)}
                    className="item ui noborder button"
                    data-testid="big-pen-button"
                    onClick={() => {
                      setOpen(true);
                      if (typeof onEdit === 'function') {
                        onEdit(id, schema);
                      }
                    }}
                  >
                    <Icon name="write square" size="large" color="blue" />
                  </Button>
                  <Button
                    aria-label={intl.formatMessage(messages.delete)}
                    title={intl.formatMessage(messages.delete)}
                    className="item ui noborder button"
                    onClick={() => {
                      onChange(id, []);
                      onDelete(id);
                    }}
                  >
                    <Icon name="close" size="large" color="red" />
                  </Button>
                </div>

                {map(error, (message) => (
                  <Label key={message} basic color="red" pointing>
                    {message}
                  </Label>
                ))}
              </Grid.Column>
            </Grid.Row>
            {description && (
              <Grid.Row stretched>
                <Grid.Column stretched width="12">
                  <p className="help">{description}</p>
                </Grid.Column>
              </Grid.Row>
            )}
          </Grid>
        </Form.Field>
      </>
    );
  },
  { forwardRef: true },
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
ObjectListWidget.propTypes = {
  id: PropTypes.string.isRequired,
  schema: PropTypes.object.isRequired,
  error: PropTypes.any,
  value: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired,
  fieldSet: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
ObjectListWidget.defaultProps = {
  value: [],
};

export default ObjectListWidget;
