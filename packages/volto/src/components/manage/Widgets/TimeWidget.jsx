import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import loadable from '@loadable/component';
import { Icon } from '@plone/volto/components';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import { toBackendLang } from '@plone/volto/helpers';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

import clearSVG from '@plone/volto/icons/clear.svg';

import 'rc-time-picker/assets/index.css';

const TimePicker = loadable(() => import('rc-time-picker'));

const messages = defineMessages({
  time: {
    id: 'Time',
    defaultMessage: 'Time',
  },
});

const TimeWidgetComponent = (props) => {
  const { id, resettable, moment, value, onChange, isDisabled } = props;

  const intl = useIntl();
  const lang = intl.locale;

  const onTimeChange = (time) => {
    if (time) {
      onChange(id, time.format('HH:mm'));
    }
  };

  const onResetTime = () => {
    onChange(id, null);
  };

  return (
    <FormFieldWrapper {...props}>
      <div className="date-time-widget-wrapper">
        <div className="ui input time-input">
          <TimePicker
            disabled={isDisabled}
            defaultValue={moment.default()}
            value={value ? moment.default(value, 'HH:mm') : null}
            onChange={onTimeChange}
            allowEmpty={false}
            showSecond={false}
            use12Hours={lang === 'en'}
            id={id}
            format={moment.default
              .localeData(toBackendLang(lang))
              .longDateFormat('LT')}
            placeholder={intl.formatMessage(messages.time)}
            focusOnOpen
            placement="bottomRight"
          />
        </div>
        {resettable && (
          <button
            type="button"
            disabled={isDisabled || !value}
            onClick={onResetTime}
            className="item ui noborder button"
          >
            <Icon name={clearSVG} size="24px" className="close" />
          </button>
        )}
      </div>
    </FormFieldWrapper>
  );
};

TimeWidgetComponent.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  resettable: PropTypes.bool,
};

TimeWidgetComponent.defaultProps = {
  description: null,
  required: false,
  error: [],
  dateOnly: false,
  noPastDates: false,
  value: null,
  resettable: true,
};

export default injectLazyLibs(['reactDates', 'moment'])(TimeWidgetComponent);
