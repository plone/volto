import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown, Icon } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';

import {
  cut,
  copy,
  copyContent,
  moveContent,
} from '@plone/volto/actions/clipboard/clipboard';
import { getBaseUrl } from '@plone/volto/helpers/Url/Url';
import Toast from '@plone/volto/components/manage/Toast/Toast';
import { ContentsRenameModal } from '@plone/volto/components/manage/Contents';

const messages = defineMessages({
  cut: {
    id: 'Cut',
    defaultMessage: 'Cut',
  },
  copy: {
    id: 'Copy',
    defaultMessage: 'Copy',
  },
  paste: {
    id: 'Paste',
    defaultMessage: 'Paste',
  },
  rename: {
    id: 'Rename',
    defaultMessage: 'Rename',
  },
  messageCopied: {
    id: '{title} copied.',
    defaultMessage: '{title} copied.',
  },
  messageCut: {
    id: '{title} cut.',
    defaultMessage: '{title} cut.',
  },
  messageDeleted: {
    id: '{title} has been deleted.',
    defaultMessage: '{title} has been deleted.',
  },
  messagePasted: {
    id: 'Item(s) pasted.',
    defaultMessage: 'Item(s) pasted.',
  },
  success: {
    id: 'Success',
    defaultMessage: 'Success',
  },
});

const Actions = (props) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [showRename, setshowRename] = useState(false);
  const actions = useSelector((state) => state.actions.actions, shallowEqual);
  const action = useSelector((state) => state.clipboard.action);
  const source = useSelector((state) => state.clipboard.source, shallowEqual);

  const id = useSelector((state) =>
    state.content.data ? state.content.data.id : '',
  );
  const title = useSelector((state) =>
    state.content.data ? state.content.data.title : '',
  );

  const onRenameOk = () => {
    setshowRename(false);
  };

  const onRenameCancel = () => {
    setshowRename(false);
  };

  const fncut = () => {
    dispatch(cut([getBaseUrl(props.pathname)]));

    toast.success(
      <Toast
        success
        title={intl.formatMessage(messages.success)}
        content={intl.formatMessage(messages.messageCut, {
          title: title,
        })}
      />,
    );
  };

  const fncopy = () => {
    dispatch(copy([getBaseUrl(props.pathname)]));
    toast.success(
      <Toast
        success
        title={intl.formatMessage(messages.success)}
        content={intl.formatMessage(messages.messageCopied, {
          title: title,
        })}
      />,
    );
  };

  const paste = () => {
    if (action === 'copy') {
      dispatch(copyContent(source, getBaseUrl(props.pathname)));
    }
    if (action === 'cut') {
      dispatch(moveContent(source, getBaseUrl(props.pathname)));
    }
    toast.success(
      <Toast
        success
        title={intl.formatMessage(messages.success)}
        content={intl.formatMessage(messages.messagePasted)}
      />,
    );
  };

  const rename = () => {
    setshowRename(true);
  };

  return (
    <Dropdown
      item
      id="toolbar-actions"
      trigger={
        <span>
          <Icon name="lightning" size="big" />{' '}
          <FormattedMessage id="Actions" defaultMessage="Actions" />
        </span>
      }
    >
      <Dropdown.Menu>
        {actions.object_buttons &&
          actions.object_buttons.map((item) => {
            switch (item.id) {
              case 'cut':
                return (
                  <Dropdown.Item
                    key={item.id}
                    icon="cut"
                    text={item.title}
                    onClick={fncut}
                  />
                );
              case 'copy':
                return (
                  <Dropdown.Item
                    key={item.id}
                    icon="copy"
                    text={item.title}
                    onClick={fncopy}
                  />
                );
              case 'paste':
                return (
                  <Dropdown.Item
                    key={item.id}
                    icon="paste"
                    text={item.title}
                    onClick={paste}
                    disabled={action === null}
                  />
                );
              case 'delete':
                return (
                  <Link
                    key={item.id}
                    to={`${props.pathname}/delete`}
                    className="item"
                  >
                    <Icon name="trash" />
                    {item.title}
                  </Link>
                );
              case 'rename':
                return (
                  <Dropdown.Item
                    key={item.id}
                    icon="text cursor"
                    text={item.title}
                    onClick={rename}
                  />
                );
              default:
                return null;
            }
          })}

        <ContentsRenameModal
          open={showRename}
          onCancel={onRenameCancel}
          onOk={onRenameOk}
          items={[
            {
              url: props.pathname,
              title: title,
              id: id,
            },
          ]}
        />
      </Dropdown.Menu>
    </Dropdown>
  );
};

Actions.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default Actions;
