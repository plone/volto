import { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';
import { map } from 'lodash';
import cx from 'classnames';
import { Form, Grid, Label, Button, Segment } from 'semantic-ui-react';

import { Icon } from '@plone/volto/components';
import { toBackendLang } from '@plone/volto/helpers';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable';

import editingSVG from '@plone/volto/icons/editing.svg';
import trashSVG from '@plone/volto/icons/delete.svg';

import { rrulei18n } from './Utils';
import Occurences from './Occurences';
import RecurrenceEditForm from './RecurrenceEditForm';

export const messages = defineMessages({
  editRecurrence: {
    id: 'Edit recurrence',
    defaultMessage: 'Edit recurrence',
  },
  save: {
    id: 'Save recurrence',
    defaultMessage: 'Save',
  },
  remove: {
    id: 'Remove recurrence',
    defaultMessage: 'Remove',
  },
  repeat: {
    id: 'Repeat',
    defaultMessage: 'Repeat',
  },
  daily: {
    id: 'Daily',
    defaultMessage: 'Daily',
  },
  mondayfriday: {
    id: 'Monday and Friday',
    defaultMessage: 'Monday and Friday',
  },

  weekdays: {
    id: 'Weekday',
    defaultMessage: 'Weekday',
  },
  weekly: {
    id: 'Weekly',
    defaultMessage: 'Weekly',
  },
  monthly: {
    id: 'Monthly',
    defaultMessage: 'Monthly',
  },
  yearly: {
    id: 'Yearly',
    defaultMessage: 'Yearly',
  },

  repeatEvery: {
    id: 'Repeat every',
    defaultMessage: 'Repeat every',
  },
  repeatOn: {
    id: 'Repeat on',
    defaultMessage: 'Repeat on',
  },

  interval_daily: {
    id: 'Interval Daily',
    defaultMessage: 'days',
  },
  interval_weekly: {
    id: 'Interval Weekly',
    defaultMessage: 'week(s)',
  },
  interval_monthly: {
    id: 'Interval Monthly',
    defaultMessage: 'Month(s)',
  },
  interval_yearly: {
    id: 'Interval Yearly',
    defaultMessage: 'year(s)',
  },
  add_date: {
    id: 'Add date',
    defaultMessage: 'Add date',
  },
  select_date_to_add_to_recurrence: {
    id: 'Select a date to add to recurrence',
    defaultMessage: 'Select a date to add to recurrence',
  },
});

export const RecurrenceWidgetFunc = (props) => {
  const {
    isDisabled,
    id,
    title,
    required = false,
    description = null,
    error = [],
    fieldSet,
    value = null,
    lang,
    formData,
    onChange,
    ...libs
  } = props;

  const moment = libs.moment.default;
  const intl = useIntl();
  const { RRuleSet, rrulestr } = libs.rrule;

  const RRULE_LANGUAGE = rrulei18n(intl, moment, toBackendLang(lang));
  const [rruleSet, setRRuleSet] = useState(() => getRRuleSet(value));
  const [editMode, setEditMode] = useState(false);

  function getRRuleSet(ruleStr) {
    return ruleStr
      ? rrulestr(ruleStr, {
          compatible: true,
          forceset: true,
        })
      : new RRuleSet(); // default
  }

  function showEdit() {
    setEditMode(true);
  }

  function onEditClose() {
    setEditMode(false);
  }

  function onEditSave(newRRuleSet) {
    const newRRuleStr = newRRuleSet.toString();
    setRRuleSet(newRRuleSet);
    onChange(id, newRRuleStr);
    onEditClose();
  }

  function deleteRRule() {
    onChange(id, null);
    setRRuleSet(new RRuleSet());
  }

  return (
    <Form.Field
      inline
      required={required}
      error={error.length > 0}
      className={cx('recurrence-widget', description ? 'help' : '')}
      id={`${fieldSet || 'field'}-${id}`}
    >
      <Grid>
        <Grid.Row stretched>
          <Grid.Column width="4">
            <div className="wrapper">
              <label htmlFor={`field-${id}`}>{title}</label>
            </div>
          </Grid.Column>
          <Grid.Column width="8">
            {rruleSet.rrules()[0] && (
              <>
                <Label>
                  {rruleSet.rrules()[0]?.toText(
                    (t) => {
                      return RRULE_LANGUAGE.strings[t];
                    },
                    RRULE_LANGUAGE,
                    RRULE_LANGUAGE.dateFormatter,
                  )}
                </Label>

                <Segment>
                  <Occurences
                    rruleSet={rruleSet}
                    showTitle={false}
                    editOccurences={false}
                  />
                </Segment>
              </>
            )}
            <div>
              <Button
                basic
                disabled={isDisabled}
                color="blue"
                className="edit-recurrence"
                onClick={showEdit}
                type="button"
                aria-label={intl.formatMessage(messages.editRecurrence)}
              >
                <Icon
                  name={editingSVG}
                  size="20px"
                  title={intl.formatMessage(messages.editRecurrence)}
                />
              </Button>
              {value && (
                <Button
                  basic
                  color="pink"
                  className="remove-recurrence"
                  onClick={() => {
                    deleteRRule();
                  }}
                  type="button"
                  aria-label={intl.formatMessage(messages.remove)}
                >
                  <Icon
                    name={trashSVG}
                    size="20px"
                    title={intl.formatMessage(messages.remove)}
                  />
                </Button>
              )}
            </div>

            {editMode && (
              <RecurrenceEditForm
                open={editMode}
                dimmer={'blurring'}
                rruleSet={rruleSet}
                onSave={onEditSave}
                onClose={onEditClose}
                formData={formData}
              />
            )}

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
  );
};

export default compose(
  injectLazyLibs(['moment', 'rrule']),
  connect((state) => ({
    lang: state.intl.locale,
  })),
)(RecurrenceWidgetFunc);
