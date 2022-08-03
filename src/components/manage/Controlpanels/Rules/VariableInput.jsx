import React from 'react';
import { Dropdown, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { getVocabulary } from '@plone/volto/actions';

const VariableInput = ({
  value,
  vocabularies,
  state,
  getVocabulary,
  onChange,
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
    switch (type) {
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
