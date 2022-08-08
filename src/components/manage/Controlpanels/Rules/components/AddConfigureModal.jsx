import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Modal } from 'semantic-ui-react';
import VariableInput from './VariableInput';

const AddConfigureModal = ({
  value,
  open,
  type,
  onClose,
  onOpen,
  onSave,
  data,
}) => {
  const [inputData, setInputData] = React.useState(data);
  const [formError, setFormError] = React.useState(false);

  React.useEffect(() => {
    setFormError(false);
    setInputData('');
  }, [open]);

  const handleSave = () => {
    if (inputData && !inputData.error) {
      onSave(inputData);
      setFormError(false);
      onClose();
    }
    if (inputData && inputData.error) {
      setFormError(true);
    }
    if (!inputData) {
      setFormError(true);
    }
  };

  const handleInputChange = (v) => {
    setInputData(v);
    setFormError(false);
  };

  return (
    <Modal
      centered={false}
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      dimmer={<Modal.Dimmer style={{ zIndex: 99 }} />}
    >
      <Modal.Header>
        Add {value.title} {type}
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <VariableInput
            value={value}
            data={inputData}
            onChange={(val) => handleInputChange(val)}
          />
          {formError && (
            <FormattedMessage
              id="Please fill out fields"
              defaultMessage="Please fill out fields"
            />
          )}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button primary onClick={() => handleSave()}>
          Save
        </Button>

        <Button onClick={onClose}>Cancel</Button>
      </Modal.Actions>
    </Modal>
  );
};

export default AddConfigureModal;
