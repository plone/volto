/**
 * IdWidget component.
 * @module components/manage/Widgets/IdWidget
 */

import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Input } from 'semantic-ui-react';
import { compact, concat, keys, map, union, uniq } from 'lodash';

import { defineMessages, useIntl } from 'react-intl';
import { Icon } from '@plone/volto/components';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import config from '@plone/volto/registry';
import { getQuerystring } from '@plone/volto/actions';

const messages = defineMessages({
  reservedId: {
    id: "This is a reserved name and can't be used",
    defaultMessage: "This is a reserved name and can't be used",
  },
  invalidCharacters: {
    id: 'Only 7-bit bytes characters are allowed. Cannot contain uppercase letters, special characters: <, >, &, #, /, ?, or others that are illegal in URLs. Cannot start with: _, aq_, @@, ++. Cannot end with __. Cannot be: request,contributors, ., .., "". Cannot contain new lines.',
    defaultMessage:
      'Only 7-bit bytes characters are allowed. Cannot contain uppercase letters, special characters: <, >, &, #, /, ?, or others that are illegal in URLs. Cannot start with: _, aq_, @@, ++. Cannot end with __. Cannot be: request,contributors, ., .., "". Cannot contain new lines.',
  },
});

const IdWidget = (props) => {
  const {
    id,
    onClick,
    icon,
    iconAction,
    minLength,
    maxLength,
    onBlur,
    value,
    focus,
    isDisabled,
    placeholder,
    onChange,
  } = props;

  const intl = useIntl();
  const dispatch = useDispatch();
  const ref = useRef();

  const indexes = useSelector((state) => keys(state.querystring.indexes));

  const [errors, setError] = useState([]);
  const [reserveIdState] = useState(
    compact(
      uniq(
        union(
          config.settings.reservedIds,
          map(config.settings.nonContentRoutes, (route) =>
            String(route).replace(/[^a-z-]/g, ''),
          ),
        ),
      ),
    ),
  );
  const fieldValidation = (values) => {
    const error = [];

    // Check reserved id's
    if (reserveIdState.indexOf(values) !== -1) {
      error.push(intl.formatMessage(messages.reservedId));
    }

    // Check invalid characters
    if (
      // eslint-disable-next-line no-control-regex
      !/^(?!.*\\)(?!\+\+)(?!@@)(?!.*request)(?!.*contributors)(?!aq_)(?!.*__)(?!_)(?!((^|\/)\.\.?($|\/)|^"\s*"$))(?!.*[A-Z])(?:(?![\r\n<>/?&#\x00-\x1F\x7F])['\x00-\x7F\u0080-\uFFFF. _])*$/.test(
        values,
      )
    ) {
      error.push(intl.formatMessage(messages.invalidCharacters));
    }

    // Check indexes
    if (indexes.indexOf(values) !== -1) {
      error.push(intl.formatMessage(messages.reservedId));
    }

    setError(error);
  };

  useEffect(() => {
    if (focus) ref.current.focus();
    dispatch(getQuerystring());
    fieldValidation(value);
  });

  const handleChange = ({ target }) => {
    fieldValidation(target.value);
    onChange(id, target.value === '' ? undefined : target.value);
  };

  const handleBlur = ({ target }) => {
    fieldValidation(target.value);
    onBlur(id, target.value === '' ? undefined : target.value);
  };

  props = {
    ...props,
    error: concat(props.error, errors),
  };

  return (
    <FormFieldWrapper {...props} className="text">
      <Input
        id={`field-${id}`}
        name={id}
        value={value || ''}
        disabled={isDisabled}
        icon={icon || null}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        onClick={() => onClick()}
        ref={ref}
        minLength={minLength || null}
        maxLength={maxLength || null}
      />
      {icon && iconAction && (
        <button className={`field-${id}-action-button`} onClick={iconAction}>
          <Icon name={icon} size="18px" />
        </button>
      )}
    </FormFieldWrapper>
  );
};

export default IdWidget;

IdWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  focus: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  icon: PropTypes.shape({
    xmlns: PropTypes.string,
    viewBox: PropTypes.string,
    content: PropTypes.string,
  }),
  iconAction: PropTypes.func,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  wrapped: PropTypes.bool,
  placeholder: PropTypes.string,
};

IdWidget.defaultProps = {
  description: null,
  required: false,
  error: [],
  value: null,
  onChange: () => {},
  onBlur: () => {},
  onClick: () => {},
  onEdit: null,
  onDelete: null,
  focus: false,
  icon: null,
  iconAction: null,
  minLength: null,
  maxLength: null,
};
