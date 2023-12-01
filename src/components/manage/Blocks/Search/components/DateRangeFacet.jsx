import React, { useState } from 'react';
import { Header } from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import { compose } from 'redux';
import { Icon } from '@plone/volto/components';
import { toBackendLang } from '@plone/volto/helpers/Utils/Utils';
import { connect } from 'react-redux';

import leftKey from '@plone/volto/icons/left-key.svg';
import rightKey from '@plone/volto/icons/right-key.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const messages = defineMessages({
  startDate: {
    id: 'Start Date',
    defaultMessage: 'Start Date',
  },
  endDate: {
    id: 'End Date',
    defaultMessage: 'End Date',
  },
});

const PrevIcon = () => (
  <div
    className="prev-icon"
    style={{
      color: '#000',
      left: '22px',
      padding: '5px',
      position: 'absolute',
      top: '15px',
    }}
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    tabIndex="0"
  >
    <Icon name={leftKey} size="30px" />
  </div>
);
const NextIcon = () => (
  <div
    className="next-icon"
    style={{
      color: '#000',
      right: '22px',
      padding: '5px',
      position: 'absolute',
      top: '15px',
    }}
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    tabIndex="0"
  >
    <Icon name={rightKey} size="30px" />
  </div>
);

const CloseIcon = () => <Icon name={clearSVG} size="24px" className="close" />;

const DateRangeFacet = (props) => {
  const { facet, isEditMode, onChange, value, reactDates, intl, lang } = props;
  const moment = props.moment.default;
  const { DateRangePicker } = reactDates;
  const [focused, setFocused] = useState(null);

  return (
    <div className="daterange-facet">
      <Header as="h4">{facet?.title ?? facet?.field?.label}</Header>
      <div className="ui form date-time-widget-wrapper">
        <div className="ui input date-input">
          <DateRangePicker
            startDate={value && value[0] ? moment(value[0]) : null}
            startDateId={`${facet['@id']}-start-date`}
            startDatePlaceholderText={intl.formatMessage(messages.startDate)}
            endDate={value && value[1] ? moment(value[1]) : null}
            endDateId={`${facet['@id']}-end-date`}
            endDatePlaceholderText={intl.formatMessage(messages.endDate)}
            numberOfMonths={1}
            disabled={isEditMode}
            noBorder
            showClearDates
            customCloseIcon={<CloseIcon />}
            displayFormat={moment
              .localeData(toBackendLang(lang))
              .longDateFormat('L')}
            focusedInput={focused}
            onFocusChange={(focusedInput) => setFocused(focusedInput)}
            onDatesChange={({ startDate, endDate }) => {
              onChange(facet.field.value, [
                startDate ? startDate.format('YYYY-MM-DD') : null,
                endDate ? endDate.format('YYYY-MM-DD') : null,
              ]);
            }}
            isOutsideRange={() => false}
            navPrev={<PrevIcon />}
            navNext={<NextIcon />}
          />
        </div>
      </div>
    </div>
  );
};

DateRangeFacet.stateToValue = ({ facetSettings, index, selectedValue }) => {
  return selectedValue || [null, null];
};

DateRangeFacet.valueToQuery = ({ value, facet }) => {
  return value && typeof value[0] === 'string' && typeof value[1] === 'string'
    ? {
        i: facet.field.value,
        o: 'plone.app.querystring.operation.date.between',
        v: value,
      }
    : null;
};

export default compose(
  injectLazyLibs(['reactDates', 'moment']),
  connect((state) => ({
    lang: state.intl.locale,
  })),
  injectIntl,
)(DateRangeFacet);
