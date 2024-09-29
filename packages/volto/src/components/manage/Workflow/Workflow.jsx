import { lazy, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { uniqBy } from 'lodash-es';
import { toast } from 'react-toastify';
import { defineMessages, useIntl } from 'react-intl';

import Icon from '@plone/volto/components/theme/Icon/Icon';
import Toast from '@plone/volto/components/manage/Toast/Toast';
import { FormFieldWrapper } from '@plone/volto/components/manage/Widgets';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import {
  getWorkflowOptions,
  getCurrentStateMapping,
} from '@plone/volto/helpers/Workflows/Workflows';

import { getContent } from '@plone/volto/actions/content/content';
import {
  getWorkflow,
  transitionWorkflow,
} from '@plone/volto/actions/workflow/workflow';
import downSVG from '@plone/volto/icons/down-key.svg';
import upSVG from '@plone/volto/icons/up-key.svg';
import checkSVG from '@plone/volto/icons/check.svg';

const messages = defineMessages({
  messageUpdated: {
    id: 'Workflow updated.',
    defaultMessage: 'Workflow updated.',
  },
  messageNoWorkflow: {
    id: 'No workflow',
    defaultMessage: 'No workflow',
  },
  state: {
    id: 'State',
    defaultMessage: 'State',
  },
});

const Select = lazy(() =>
  import('react-select').then((module) => ({
    default: module.default,
    SingleValue: module.SingleValue,
    Option: module.Option,
    DropdownIndicator: module.DropdownIndicator,
    Placeholder: module.Placeholder,
  })),
);

const SingleValue = ({ children, ...props }) => {
  const stateDecorator = {
    marginRight: '10px',
    display: 'inline-block',
    backgroundColor: props.selectProps.value.color || null,
    content: ' ',
    height: '10px',
    width: '10px',
    borderRadius: '50%',
  };

  return (
    <Select.SingleValue {...props}>
      <span style={stateDecorator} />
      {children}
    </Select.SingleValue>
  );
};

const Option = (props) => {
  const stateDecorator = {
    marginRight: '10px',
    display: 'inline-block',
    backgroundColor:
      props.selectProps.value.value === props.data.value
        ? props.selectProps.value.color
        : null,
    content: ' ',
    height: '10px',
    width: '10px',
    borderRadius: '50%',
    border:
      props.selectProps.value.value !== props.data.value
        ? `1px solid ${props.data.color}`
        : null,
  };

  return (
    <Select.Option {...props}>
      <span style={stateDecorator} />
      <div style={{ marginRight: 'auto' }}>{props.label}</div>
      {props.isFocused && !props.isSelected && (
        <Icon name={checkSVG} size="18px" color="#b8c6c8" />
      )}
      {props.isSelected && <Icon name={checkSVG} size="18px" color="#007bc1" />}
    </Select.Option>
  );
};

const DropdownIndicator = (props) => {
  return (
    <Select.DropdownIndicator {...props} data-testid="workflow-select-dropdown">
      {props.selectProps.menuIsOpen ? (
        <Icon name={upSVG} size="24px" color="#007bc1" />
      ) : (
        <Icon name={downSVG} size="24px" color="#007bc1" />
      )}
    </Select.DropdownIndicator>
  );
};

const selectTheme = (theme) => ({
  ...theme,
  borderRadius: 0,
  colors: {
    ...theme.colors,
    primary25: 'hotpink',
    primary: '#b8c6c8',
  },
});

const customSelectStyles = {
  control: (styles, state) => ({
    ...styles,
    border: 'none',
    borderBottom: '2px solid #b8c6c8',
    boxShadow: 'none',
    borderBottomStyle: state.menuIsOpen ? 'dotted' : 'solid',
  }),
  menu: (styles, state) => ({
    ...styles,
    top: null,
    marginTop: 0,
    boxShadow: 'none',
    borderBottom: '2px solid #b8c6c8',
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    width: null,
  }),
  valueContainer: (styles) => ({
    ...styles,
    padding: 0,
  }),
  option: (styles, state) => ({
    ...styles,
    backgroundColor: null,
    minHeight: '50px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 12px',
    color: state.isSelected
      ? '#007bc1'
      : state.isFocused
        ? '#4a4a4a'
        : 'inherit',
    ':active': {
      backgroundColor: null,
    },
    span: {
      flex: '0 0 auto',
    },
    svg: {
      flex: '0 0 auto',
    },
  }),
};

function useWorkflow() {
  const history = useSelector((state) => state.workflow.history, shallowEqual);
  const transitions = useSelector(
    (state) => state.workflow.transitions,
    shallowEqual,
  );
  const loaded = useSelector((state) => state.workflow.transition.loaded);
  const currentStateValue = useSelector(
    (state) => getCurrentStateMapping(state.workflow.currentState),
    shallowEqual,
  );

  return { loaded, history, transitions, currentStateValue };
}

const Workflow = (props) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { loaded, transitions, currentStateValue } = useWorkflow();
  const content = useSelector((state) => state.content?.data, shallowEqual);
  const { pathname } = props;

  useEffect(() => {
    dispatch(getWorkflow(pathname));
    dispatch(getContent(pathname));
  }, [dispatch, pathname, loaded]);

  const transition = (selectedOption) => {
    dispatch(transitionWorkflow(flattenToAppURL(selectedOption.url)));
    toast.success(
      <Toast
        success
        title={intl.formatMessage(messages.messageUpdated)}
        content=""
      />,
    );
  };

  const Placeholder = Select.Placeholder;

  return (
    <FormFieldWrapper
      id="state-select"
      title={intl.formatMessage(messages.state)}
      intl={intl}
      {...props}
    >
      <Select
        name="state-select"
        className="react-select-container"
        classNamePrefix="react-select"
        isDisabled={!content.review_state || transitions.length === 0}
        options={uniqBy(
          transitions.map((transition) => getWorkflowOptions(transition)),
          'label',
        ).concat(currentStateValue)}
        styles={customSelectStyles}
        theme={selectTheme}
        components={{
          DropdownIndicator,
          Placeholder,
          Option,
          SingleValue,
        }}
        onChange={transition}
        value={
          content.review_state
            ? currentStateValue
            : {
                label: intl.formatMessage(messages.messageNoWorkflow),
                value: 'noworkflow',
              }
        }
        isSearchable={false}
      />
    </FormFieldWrapper>
  );
};

Workflow.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default Workflow;
