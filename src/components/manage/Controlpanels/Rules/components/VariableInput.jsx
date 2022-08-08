import React from 'react';
import { Dropdown, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { flattenToAppURL } from '@plone/volto/helpers';
import { getVocabulary } from '@plone/volto/actions';
import { FormattedMessage } from 'react-intl';
import LoggerActionInput from './LoggerActionInput';
import NotifyActionInput from './NotifyActionInput';
import UrlWidget from '@plone/volto/components/manage/Widgets/UrlWidget';

const VariableInput = ({
  value,
  vocabularies,
  state,
  getVocabulary,
  onChange,
  data,
}) => {
  const [vocabularyName, setVocabularyName] = React.useState('');

  const { addview = '' } = value;

  React.useEffect(() => {
    const detectedVocab = detectVocabulary(value.title);
    if (detectedVocab) {
      setVocabularyName(detectedVocab);

      getVocabulary({ vocabNameOrURL: detectedVocab });
    }
  }, [value, getVocabulary]);

  const vocabularyOptions =
    vocabularyName &&
    vocabularies &&
    vocabularies[vocabularyName] &&
    vocabularies[vocabularyName].items
      ? vocabularies[vocabularyName].items.map((item, i) => {
          return { key: item.value, text: item.label, value: item.value };
        })
      : [];

  const setInput = (type) => {
    console.log('type', type);
    switch (type) {
      //conditions
      case 'Content type':
        return (
          <Dropdown
            placeholder="Content Type"
            fluid
            multiple
            selection
            onChange={(e, { value }) =>
              onChange(
                value.length > 0
                  ? { check_types: value, type: addview }
                  : { error: 'error' },
              )
            }
            options={vocabularyOptions}
          />
        );
      case 'File Extension':
        return (
          <Input
            placeholder="The file extension to check for"
            fluid
            onChange={(e, { value }) =>
              onChange(
                value
                  ? { file_extension: value, type: addview }
                  : { error: 'error' },
              )
            }
          />
        );
      case 'Workflow state':
        return (
          <Dropdown
            placeholder="Workflow State"
            fluid
            multiple
            selection
            onChange={(e, { value }) =>
              onChange(
                value.length > 0
                  ? { wf_states: value, type: addview }
                  : { error: 'error' },
              )
            }
            options={vocabularyOptions}
          />
        );
      case "User's group":
        return (
          <Dropdown
            placeholder="Groups"
            fluid
            multiple
            selection
            onChange={(e, { value }) =>
              onChange(
                value.length > 0
                  ? { group_names: value, type: addview }
                  : { error: 'error' },
              )
            }
            options={vocabularyOptions}
          />
        );
      case "User's role":
        return (
          <Dropdown
            placeholder="Roles"
            fluid
            multiple
            selection
            onChange={(e, { value }) =>
              onChange(
                value.length > 0
                  ? { role_names: value, type: addview }
                  : { error: 'error' },
              )
            }
            options={vocabularyOptions}
          />
        );
      case 'TALES expression':
        return (
          <Input
            placeholder="TALES expression to check"
            fluid
            onChange={(e, { value }) =>
              onChange(
                value
                  ? { tales_expression: value, type: addview }
                  : { error: 'error' },
              )
            }
          />
        );
      // actions
      case 'Logger':
        return (
          <LoggerActionInput data={data} onChange={onChange} type={addview} />
        );
      case 'Notify user':
        return (
          <NotifyActionInput
            data={data}
            onChange={onChange}
            type={addview}
            options={[
              { key: 'info', text: 'info', value: 'info' },
              { key: 'warning', text: 'warning', value: 'warning' },
              { key: 'error', text: 'error', value: 'error' },
            ]}
          />
        );
      case 'Copy to folder':
        return (
          <UrlWidget
            title="Target folder: "
            onChange={(id, val) =>
              onChange(
                value
                  ? { target_folder: flattenToAppURL(val), type: addview }
                  : { error: 'error' },
              )
            }
          />
        );
      case 'Move to folder':
        return (
          <UrlWidget
            title="Target folder: "
            onChange={(id, val) =>
              onChange(
                value
                  ? { target_folder: flattenToAppURL(val), type: addview }
                  : { error: 'error' },
              )
            }
          />
        );

      default:
        return <p>Not supported</p>;
    }
  };

  const detectVocabulary = (type) => {
    switch (type) {
      case 'Content type':
        return 'plone.app.vocabularies.ReallyUserFriendlyTypes';
      case 'Workflow state':
        return 'plone.app.vocabularies.WorkflowStates';
      case "User's group":
        return 'plone.app.vocabularies.Groups';
      case "User's role":
        return 'plone.app.vocabularies.Roles';
      default:
        return '';
    }
  };

  return <div>{setInput(value.title)}</div>;
};

export default connect(
  (state, props) => ({
    vocabularies: state.vocabularies,
  }),
  { getVocabulary },
)(VariableInput);
