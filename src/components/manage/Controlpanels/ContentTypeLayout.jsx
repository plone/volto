import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {
  getParentUrl,
  hasBlocksData,
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  usePrevious,
} from '@plone/volto/helpers';
import { useClient } from '@plone/volto/hooks';
import { Portal } from 'react-portal';
import { Button, Segment } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { defineMessages, useIntl, FormattedMessage } from 'react-intl';
import { nth, join } from 'lodash';
import {
  Error,
  Form,
  Icon,
  Toolbar,
  Sidebar,
  Toast,
} from '@plone/volto/components';
import {
  getSchema,
  updateSchema,
  getControlpanel,
  updateControlpanel,
} from '@plone/volto/actions';

import saveSVG from '@plone/volto/icons/save.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import backSVG from '@plone/volto/icons/back.svg';

const messages = defineMessages({
  changesSaved: {
    id: 'Changes saved.',
    defaultMessage: 'Changes saved.',
  },
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  save: {
    id: 'Save',
    defaultMessage: 'Save',
  },
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
  info: {
    id: 'Info',
    defaultMessage: 'Info',
  },
  enable: {
    id: 'Enable editable Blocks',
    defaultMessage: 'Enable editable Blocks',
  },
});

const ContentTypeLayout = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const history = useHistory();
  const [visual, setVisual] = useState(false);
  const [content, setContent] = useState(null);
  const [readOnlyBehavior, setReadOnlyBehaviour] = useState(null);
  const [error, setError] = useState(null);
  const isClient = useClient();

  const form = useRef();

  const controlpanel = useSelector((state) => state.controlpanels.controlpanel);

  const schemaRequest = useSelector((state) => state.schema);
  const cpanelRequest = useSelector((state) => state.controlpanels);
  const { pathname } = useLocation();
  const id = nth(pathname.split('/'), -2);
  const parent = nth(pathname.split('/'), -3);

  const prevcpanelRequestgetloading = usePrevious(cpanelRequest.get?.loading);
  const prevschemaRequestloading = usePrevious(schemaRequest.loading);
  const prevschemaRequestupdateloading = usePrevious(
    schemaRequest?.update?.loading,
  );
  const prevcpanelRequestupdateloading = usePrevious(
    cpanelRequest.update?.loading,
  );
  const schema = useSelector((state) => state.schema.schema);
  const cpanelRequestgeterror = cpanelRequest.get?.error;
  const cpanelRequestupdateloaded = cpanelRequest.update?.loaded;
  const schemaRequestupdateloaded = schemaRequest.update?.loaded;
  const schemaRequestloaded = schemaRequest.loaded;
  const schemaProperties = schema?.properties;
  const onEnableBlocks = useCallback(() => {
    const { properties = {} } = schema;
    const blocksFieldName = getBlocksFieldname(properties);
    const blocksLayoutFieldname = getBlocksLayoutFieldname(properties);
    const schemas = {
      fieldsets: [
        {
          id: 'layout',
          title: 'Layout',
          fields: ['blocks', 'blocks_layout'],
        },
      ],
      properties: {
        blocks: {
          title: 'Blocks',
          type: 'dict',
          widget: 'json',
          factory: 'JSONField',
          default: properties[blocksFieldName]?.default || {},
        },
        blocks_layout: {
          title: 'Blocks Layout',
          type: 'dict',
          widget: 'json',
          factory: 'JSONField',
          default: properties[blocksLayoutFieldname]?.default || { items: [] },
        },
      },
    };
    dispatch(updateSchema(id, schemas));
  }, [dispatch, id, schema]);

  useEffect(() => {
    dispatch(getControlpanel(join([parent, id], '/')));
    dispatch(getSchema(id));
  }, [dispatch, id, parent]);

  useEffect(() => {
    if (prevcpanelRequestgetloading && cpanelRequestgeterror) {
      setError(cpanelRequestgeterror);
    }
    // Schema GET
    if (prevschemaRequestloading && schemaRequestloaded) {
      const properties = schemaProperties || {};
      const content = {};
      for (const key in properties) {
        const value = properties[key].default;
        if (value) {
          content[key] = value;
        }
      }

      if (hasBlocksData(properties)) {
        setVisual(true);

        const blocksFieldName = getBlocksFieldname(properties);
        const blocksLayoutFieldname = getBlocksLayoutFieldname(properties);
        content[blocksFieldName] = properties[blocksFieldName]?.default || {};
        content[blocksLayoutFieldname] = properties[blocksLayoutFieldname]
          ?.default || { items: [] };

        const blocksBehavior = properties[blocksFieldName]?.behavior || '';
        setReadOnlyBehaviour(
          !blocksBehavior.includes('generated') ? blocksBehavior : '',
        );
      } else {
        setVisual(false);
        setReadOnlyBehaviour('');
      }
      setContent(content);
    }
    if (prevschemaRequestupdateloading && schemaRequestupdateloaded) {
      dispatch(getSchema(id));
      toast.info(
        <Toast
          info
          title={intl.formatMessage(messages.info)}
          content={intl.formatMessage(messages.changesSaved)}
        />,
      );
    }
    if (prevcpanelRequestupdateloading && cpanelRequestupdateloaded) {
      onEnableBlocks();
    }
  }, [
    prevcpanelRequestgetloading,
    cpanelRequestgeterror,
    cpanelRequestupdateloaded,
    prevschemaRequestloading,
    schemaRequestloaded,
    schemaProperties,
    schemaRequestupdateloaded,
    prevschemaRequestupdateloading,
    prevcpanelRequestupdateloading,

    dispatch,
    id,
    intl,
    onEnableBlocks,
  ]);

  const onSubmit = (data) => {
    const schema = { properties: {} };
    Object.keys(data)
      .filter((k) => data[k])
      .forEach((k) => (schema.properties[k] = { default: data[k] }));
    dispatch(updateSchema(id, schema));
  };

  const onCancel = () => {
    const url = getParentUrl(pathname);
    history.push(getParentUrl(url));
  };

  const onDisableBlocksBehavior = () => {
    dispatch(
      updateControlpanel(controlpanel['@id'], {
        [readOnlyBehavior]: false,
        'volto.blocks.editable.layout': true,
      }),
    );
  };

  const onEnableBlocksBehavior = () => {
    dispatch(
      updateControlpanel(controlpanel['@id'], {
        'volto.blocks.editable.layout': true,
      }),
    );
  };

  // Error
  if (error) {
    return <Error error={error} />;
  }

  if (!visual) {
    // Still loading
    if (!content) {
      return <div />;
    }

    // Blocks are not enabled
    return (
      <>
        <Segment
          placeholder
          id="page-controlpanel-layout"
          className="ui container center aligned"
        >
          <div>
            <FormattedMessage
              id="Can not edit Layout for <strong>{type}</strong> content-type as it doesn't have support for <strong>Volto Blocks</strong> enabled"
              defaultMessage="Can not edit Layout for <strong>{type}</strong> content-type as it doesn't have support for <strong>Volto Blocks</strong> enabled"
              values={{
                strong: (...chunks) => <strong>{chunks}</strong>,
                type: controlpanel?.title || id,
              }}
            />
          </div>
          <div className="ui divider"></div>
          <Button
            primary
            onClick={onEnableBlocksBehavior}
            content={intl.formatMessage(messages.enable)}
          />
        </Segment>
        <Portal node={isClient && document.getElementById('toolbar')}>
          <Toolbar
            pathname={pathname}
            hideDefaultViewButtons
            inner={
              <>
                <Link className="item" to="#" onClick={() => onCancel()}>
                  <Icon
                    name={backSVG}
                    size="30px"
                    className="contents circled"
                    title={intl.formatMessage(messages.back)}
                  />
                </Link>
              </>
            }
          />
        </Portal>
      </>
    );
  }

  if (readOnlyBehavior) {
    return (
      <>
        <Segment
          placeholder
          id="page-controlpanel-layout"
          className="ui container center aligned"
        >
          <div>
            <FormattedMessage
              id="Can not edit Layout for <strong>{type}</strong> content-type as the <strong>Blocks behavior</strong> is enabled and <strong>read-only</strong>"
              defaultMessage="Can not edit Layout for <strong>{type}</strong> content-type as the <strong>Blocks behavior</strong> is enabled and <strong>read-only</strong>"
              values={{
                strong: (...chunks) => <strong>{chunks}</strong>,
                type: controlpanel?.title || id,
              }}
            />
          </div>
          <div className="ui divider"></div>
          <Button
            primary
            onClick={onDisableBlocksBehavior}
            content={intl.formatMessage(messages.enable)}
          />
        </Segment>
        <Portal node={isClient && document.getElementById('toolbar')}>
          <Toolbar
            pathname={pathname}
            hideDefaultViewButtons
            inner={
              <>
                <Link className="item" to="#" onClick={() => onCancel()}>
                  <Icon
                    name={backSVG}
                    size="30px"
                    className="contents circled"
                    title={intl.formatMessage(messages.back)}
                  />
                </Link>
              </>
            }
          />
        </Portal>
      </>
    );
  }

  // Render layout editor
  const blocksFieldName = getBlocksFieldname(schema?.properties || {});
  const blocksLayoutFieldname = getBlocksLayoutFieldname(
    schema?.properties || {},
  );
  return (
    <div id="page-controlpanel-layout">
      <Form
        isAdminForm
        ref={form}
        schema={{
          fieldsets: [
            {
              id: 'layout',
              title: 'Layout',
              fields: [blocksFieldName, blocksLayoutFieldname],
            },
          ],
          properties: {
            ...schema.properties[blocksFieldName],
            ...schema.properties[blocksLayoutFieldname],
          },
          required: [],
        }}
        formData={content}
        onSubmit={onSubmit}
        onCancel={onCancel}
        pathname={pathname}
        visual={visual}
        hideActions
      />
      <Portal node={isClient && document.getElementById('sidebar')}>
        <Sidebar settingsTab={true} documentTab={false} />
      </Portal>
      <Portal node={isClient && document.getElementById('toolbar')}>
        <Toolbar
          pathname={pathname}
          hideDefaultViewButtons
          inner={
            <>
              <Button
                id="toolbar-save"
                className="save"
                aria-label={intl.formatMessage(messages.save)}
                onClick={() => form.current.onSubmit()}
                disabled={schemaRequest.update.loading}
                loading={schemaRequest.update.loading}
              >
                <Icon
                  name={saveSVG}
                  className="circled"
                  size="30px"
                  title={intl.formatMessage(messages.save)}
                />
              </Button>
              <Button
                className="cancel"
                aria-label={intl.formatMessage(messages.cancel)}
                onClick={() => onCancel()}
              >
                <Icon
                  name={clearSVG}
                  className="circled"
                  size="30px"
                  title={intl.formatMessage(messages.cancel)}
                />
              </Button>
            </>
          }
        />
      </Portal>
    </div>
  );
};

export default ContentTypeLayout;
