import React from 'react';
import { Button, Dropdown, Modal } from 'semantic-ui-react';

const VariableInput = ({ value }) => {
  const [vocabulary, setVocabulary] = React.useState('');

  React.useEffect(() => {
    detectVocabulary(value.title);
  }, [value]);

  const setInput = (type) => {
    switch (type) {
      case 'Content type':
        // setVocabulary('plone.app.vocabularies.PortalTypes');
        return (
          <Dropdown
            placeholder="Content Type"
            fluid
            multiple
            selection
            options={[]}
          />
        );
      default:
        return <p>Not supported</p>;
    }
  };

  const detectVocabulary = (type) => {
    switch (type) {
      case 'Content type':
        return setVocabulary('plone.app.vocabularies.PortalTypes');

      default:
        return;
    }
  };

  const DetectedInput = setInput(value.title);

  return <div>{setInput(value.title)}</div>;
};

const AddConfigureModal = ({ value, open, type, onClose, onOpen }) => {
  console.log(value);

  const handleSave = () => {
    console.log('saving');
  };
  return (
    <Modal centered={false} open={open} onClose={onClose} onOpen={onOpen}>
      <Modal.Header>
        Add {value.title} {type}
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <VariableInput value={value} />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleSave}>Save</Button>

        <Button onClick={onClose}>Cancel</Button>
      </Modal.Actions>
    </Modal>
  );
};

export default AddConfigureModal;
