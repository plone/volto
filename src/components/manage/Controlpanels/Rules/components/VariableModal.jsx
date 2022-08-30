import React from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { getVocabulary } from '@plone/volto/actions';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';

import { ModalForm } from '@plone/volto/components';

const VariableModal = ({
  open,
  type,
  onClose,
  onOpen,
  onSave,
  value,
  vocabularies,
  getVocabulary,
  onChange,
  action,
}) => {
  const [vocabularyName, setVocabularyName] = React.useState('');
  const [inputSchema, setInputSchema] = React.useState('');

  const { addview = '' } = value;
  // console.log('will edit', value);
  React.useEffect(() => {
    const detectedVocab = detectVocabulary(value.title);
    if (detectedVocab) {
      setVocabularyName(detectedVocab);

      getVocabulary({ vocabNameOrURL: detectedVocab });
    }
    setInputSchema(setSchema(value.title));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, getVocabulary, open]);

  const vocabularyOptions =
    vocabularyName &&
    vocabularies &&
    vocabularies[vocabularyName] &&
    vocabularies[vocabularyName].items
      ? vocabularies[vocabularyName].items.map((item, i) => {
          return [item.value, item.label];
        })
      : [];

  const handleSave = (v) => {
    onSave({ ...v, type: addview });
    setInputSchema('');
    onClose();
  };

  const handleClose = () => {
    setInputSchema('');
    onClose();
  };

  const setSchema = (name) => {
    switch (name) {
      //conditions
      case 'Content type':
        return {
          fieldsets: [
            {
              id: 'default',
              title: 'default',
              fields: ['check_types'],
            },
          ],
          properties: {
            check_types: {
              title: 'Content Types',
              isMulti: true,
              default: vocabularyOptions[0],
              choices: vocabularyOptions,
            },
          },
          required: ['check_types'],
        };
      case 'File Extension':
        return {
          fieldsets: [
            {
              id: 'default',
              title: 'default',
              fields: ['file_extension'],
            },
          ],
          properties: {
            file_extension: {
              title: 'File Extension',
              type: 'string',
            },
          },
          required: ['file_extension'],
        };
      case 'Workflow state':
        return {
          fieldsets: [
            {
              id: 'default',
              title: 'default',
              fields: ['wf_states'],
            },
          ],
          properties: {
            wf_states: {
              title: 'Workflow State',
              isMulti: true,
              default: vocabularyOptions[0],
              choices: vocabularyOptions,
            },
          },
          required: ['wf_states'],
        };
      case "User's group":
        return {
          fieldsets: [
            {
              id: 'default',
              title: 'default',
              fields: ['group_names'],
            },
          ],
          properties: {
            group_names: {
              title: 'Groups',
              isMulti: true,
              default: vocabularyOptions[0],
              choices: vocabularyOptions,
            },
          },
          required: ['group_names'],
        };
      case "User's role":
        return {
          fieldsets: [
            {
              id: 'default',
              title: 'default',
              fields: ['role_names'],
            },
          ],
          properties: {
            role_names: {
              title: 'Roles',
              isMulti: true,
              default: vocabularyOptions[0],
              choices: vocabularyOptions,
            },
          },
          required: ['role_names'],
        };
      case 'TALES expression':
        return {
          fieldsets: [
            {
              id: 'default',
              title: 'default',
              fields: ['tales_expression'],
            },
          ],
          properties: {
            tales_expression: {
              title: 'File Extension',
              type: 'string',
            },
          },
          required: ['tales_expression'],
        };
      // actions
      case 'Logger':
        return {
          title: 'Logger',
          fieldsets: [
            {
              id: 'default',
              title: 'Logger Action',
              fields: ['targetLogger', 'Level', 'message'],
            },
          ],
          properties: {
            targetLogger: {
              title: 'Logger name',
              type: 'string',
            },
            Level: {
              title: 'Logging level',
              type: 'string',
            },
            message: {
              title: 'Message',
              type: 'string',
            },
          },
          required: ['targetLogger', 'Level', 'message'],
        };
      case 'Notify user':
        return {
          title: 'Notify user',
          fieldsets: [
            {
              id: 'default',
              title: 'Message',
              fields: ['message', 'message_type'],
            },
          ],
          properties: {
            message: {
              title: 'Message',
              type: 'string',
            },
            message_type: {
              title: 'Message Type',
              default: ['info', 'info'],
              choices: [
                ['info', 'info'],
                ['warning', 'warning'],
                ['error', 'error'],
              ],
            },
          },
          required: ['message', 'message_type'],
        };
      case 'Copy to folder':
        return {
          title: 'Target folder: ',
          fieldsets: [
            {
              id: 'default',
              title: 'Target folder: ',
              fields: ['target_folder'],
            },
          ],
          properties: {
            target_folder: {
              title: 'Target folder: ',
              widget: 'internal_url',
            },
          },
          required: ['target_folder'],
        };
      case 'Move to folder':
        return {
          title: 'Target folder: ',
          fieldsets: [
            {
              id: 'default',
              title: 'Target folder: ',
              fields: ['target_folder'],
            },
          ],
          properties: {
            target_folder: {
              title: 'Target folder: ',
              widget: 'internal_url',
            },
          },
          required: ['target_folder'],
        };
      case 'Delete object':
        return {
          title: 'Delete',
          fieldsets: [
            {
              id: 'default',
              title: 'Target folder: ',
              fields: [],
            },
          ],
          properties: {},
          required: [],
        };
      case 'Transition workflow state':
        return {
          fieldsets: [
            {
              id: 'default',
              title: 'Transition workflow state',
              fields: ['transition'],
            },
          ],
          properties: {
            transition: {
              title: 'Transition workflow state',
              isMulti: true,
              default: vocabularyOptions[0],
              choices: vocabularyOptions,
            },
          },
          required: ['transition'],
        };
      case 'Send email':
        return {
          title: 'Send mail',
          fieldsets: [
            {
              id: 'default',
              title: 'Send mail',
              fields: ['subject', 'source', 'recipients', 'message'],
            },
          ],
          properties: {
            message: {
              title: 'Message',
              widget: 'textarea',
            },
            subject: {
              title: 'Subject',
              type: 'string',
            },
            source: {
              title: 'Email source',
              type: 'string',
            },
            recipients: {
              title: 'Email Recipients',
              type: 'string',
            },
            exclude_actor: {
              title: 'Exclude actor from recipients',
              description:
                'Do not send the email to the user that did the action.',
              type: 'boolean',
            },
          },
          required: ['subject', 'recipients', 'message'],
        };
      case 'Version object':
        return {
          title: 'Send mail',
          fieldsets: [
            {
              id: 'default',
              title: 'Send mail',
              fields: ['comment'],
            },
          ],
          properties: {
            comment: {
              title: 'Comment',
              type: 'string',
            },
          },
          required: ['comment'],
        };
      case 'IMSv4: Retract and rename old Indicator':
        return {
          title: 'Delete',
          fieldsets: [
            {
              id: 'default',
              title: 'Target folder: ',
              fields: [],
            },
          ],
          properties: {},
          required: [],
        };

      default:
        return '';
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
      case 'Transition workflow state':
        return 'plone.app.vocabularies.WorkflowTransitions';
      default:
        return '';
    }
  };
  return (
    <div>
      {inputSchema && (
        <ModalForm
          dimmer={<Modal.Dimmer style={{ zIndex: 99 }} />}
          open={open}
          onSubmit={(data) => handleSave(data)}
          onCancel={handleClose}
          //formData={data}
          title={`Add ${value.title} ${type}`}
          schema={inputSchema}
        />
      )}
      {/* {setInput(value.title)} */}
    </div>
  );
};

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      vocabularies: state.vocabularies,
    }),
    { getVocabulary },
  ),
)(VariableModal);
