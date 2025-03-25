import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import isEqual from 'react-fast-compare';
import { toast } from 'react-toastify';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import Toast from '@plone/volto/components/manage/Toast/Toast';
import { Button } from 'semantic-ui-react';
import checkSVG from '@plone/volto/icons/check.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import { useIntl, defineMessages } from 'react-intl';
import { useLocation } from 'react-router-dom';

const messages = defineMessages({
  autoSaveFound: {
    id: 'Autosaved content found',
    defaultMessage: 'Autosaved content found',
  },
  loadData: {
    id: 'Do you want to restore the autosaved content?',
    defaultMessage: 'Do you want to restore the autosaved content?',
  },
  loadExpiredData: {
    id: 'The version of the autosaved content I found in your browser is older than that stored on the server. Do you want to restore the autosaved content? (You can undo the autosaved content and revert to the server version.)',
    defaultMessage:
      'The version of the autosaved content I found in your browser is older than that stored on the server. Do you want to restore the autosaved content? (You can undo the autosaved content and revert to the server version.)',
  },
});

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const mapSchemaToData = (schema, data) => {
  if (!data) return {};
  const dataKeys = Object.keys(data);
  return Object.assign(
    {},
    ...Object.keys(schema.properties)
      .filter((k) => dataKeys.includes(k))
      .map((k) => ({ [k]: data[k] })),
  );
};

// will be used to avoid using the first mount call if there is a second call
let mountTime;

const getFormId = (props, location) => {
  const { type, pathname = location.pathname, isEditForm, schema } = props;
  const id = isEditForm
    ? ['form', type, pathname].join('-')
    : type
      ? ['form', pathname, type].join('-')
      : schema?.properties?.comment
        ? ['form', pathname, 'comment'].join('-')
        : ['form', pathname].join('-');

  return id;
};

/**
 * Toast content that has OK and Cancel buttons
 * @param {function} onUpdate
 * @param {function} onClose
 * @param {string} userMessage
 * @returns
 */
const ConfirmAutoSave = ({ onUpdate, onClose, userMessage }) => {
  const handleClickOK = () => onUpdate();
  const handleClickCancel = () => onClose();

  return (
    <div className="toast-box-center">
      <div>{userMessage}</div>
      <Button
        icon
        aria-label="Unchecked"
        className="save toast-box"
        onClick={handleClickOK}
      >
        <Icon
          name={checkSVG}
          size="24px"
          className="circled toast-box-blue-icon"
        />
      </Button>
      <Button
        icon
        aria-label="Unchecked"
        className="save toast-box"
        onClick={handleClickCancel}
      >
        <Icon
          name={clearSVG}
          size="24px"
          className="circled toast-box-blue-icon"
        />
      </Button>
    </div>
  );
};

/**
 * Will remove localStorage item using debounce
 * @param {string} id
 * @param {number} timerForDeletion
 */
const clearStorage = (id, timerForDeletion) => {
  timerForDeletion.current && clearTimeout(timerForDeletion.current);
  timerForDeletion.current = setTimeout(() => {
    localStorage.removeItem(id);
  }, 500);
};

/**
 * Stale if server date is more recent
 * @param {string} serverModifiedDate
 * @param {string} autoSaveDate
 * @returns {Boolean}
 */
const autoSaveFoundIsStale = (serverModifiedDate, autoSaveDate) => {
  const result = !serverModifiedDate
    ? false
    : new Date(serverModifiedDate) > new Date(autoSaveDate);
  return result;
};

const draftApi = (id, schema, timer, timerForDeletion, intl) => ({
  // - since Add Content Type will call componentDidMount twice, we will
  // use the second call (using debounce)- the first will ignore any setState comands;
  // - Delete local data only if user confirms Cancel
  // - Will tell user that it has local stored data, even if its less recent than the server data
  checkSavedDraft(state, updateCallback) {
    if (!schema) return;
    const saved = localStorage.getItem(id);

    if (saved) {
      const formData = mapSchemaToData(schema, state);
      // includes autoSaveDate
      const foundSavedData = JSON.parse(saved);
      // includes only form data found in schema (no autoSaveDate)
      const foundSavedSchemaData = mapSchemaToData(schema, foundSavedData);

      if (!isEqual(formData, foundSavedSchemaData)) {
        // eslint-disable-next-line no-alert
        // cancel existing setTimeout to avoid using first call if
        // successive calls are made
        mountTime && clearTimeout(mountTime);
        mountTime = setTimeout(() => {
          toast.info(
            <Toast
              position="top-right"
              info
              autoClose={false}
              title={intl.formatMessage(messages.autoSaveFound)}
              content={
                <ConfirmAutoSave
                  onUpdate={() => updateCallback(foundSavedSchemaData)}
                  onClose={() => clearStorage(id, timerForDeletion)}
                  userMessage={
                    autoSaveFoundIsStale(
                      state.modified,
                      foundSavedData.autoSaveDate,
                    )
                      ? intl.formatMessage(messages.loadExpiredData)
                      : intl.formatMessage(messages.loadData)
                  }
                />
              }
            />,
          );
        }, 300);
      }
    }
  },
  // use debounce mode
  onSaveDraft(state) {
    if (!schema) return;
    timer.current && clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const formData = mapSchemaToData(schema, state);
      const saved = localStorage.getItem(id);
      const newData = JSON.parse(saved);

      localStorage.setItem(
        id,
        JSON.stringify({
          ...newData,
          ...formData,
          autoSaveDate: new Date(),
        }),
      );
    }, 300);
  },

  onCancelDraft() {
    if (!schema) return;
    clearStorage(id, timerForDeletion);
  },
});

export default function withSaveAsDraft(options) {
  const { forwardRef } = options;

  return (WrappedComponent) => {
    function WithSaveAsDraft(props) {
      const { schema } = props;
      const intl = useIntl();
      const location = useLocation();
      const id = getFormId(props, location);
      const ref = React.useRef();
      const ref2 = React.useRef();
      const api = React.useMemo(
        () => draftApi(id, schema, ref, ref2, intl),
        [id, schema, ref, ref2, intl],
      );

      return (
        <WrappedComponent
          {...props}
          {...api}
          ref={forwardRef ? props.forwardedRef : null}
        />
      );
    }

    WithSaveAsDraft.displayName = `WithSaveAsDraft(${getDisplayName(
      WrappedComponent,
    )})`;

    if (forwardRef) {
      return hoistNonReactStatics(
        React.forwardRef((props, ref) => (
          <WithSaveAsDraft {...props} forwardedRef={ref} />
        )),
        WrappedComponent,
      );
    }

    return hoistNonReactStatics(WithSaveAsDraft, WrappedComponent);
  };
}
