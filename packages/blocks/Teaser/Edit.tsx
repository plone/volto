import { DialogTrigger, ModalOverlay, Heading } from 'react-aria-components';
import { Dialog, Modal } from '@plone/components';
import { Button } from '@plone/components/tailwind';

export default function TeaserEdit() {
  return (
    <div className="teaser-edit" contentEditable="false">
      <DialogTrigger>
        <Button>Edit block</Button>
        <ModalOverlay className="my-overlay">
          <Modal className="my-modal">
            <Dialog>
              <Heading slot="title">Notice</Heading>
              <p>This is a modal with a custom modal overlay.</p>
              <Button slot="close">Close</Button>
            </Dialog>
          </Modal>
        </ModalOverlay>
      </DialogTrigger>
      <p>
        This is a teaser block. You can edit the content in the block settings.
      </p>
      <p>
        To add a teaser, select a content item from the list or paste a link to
        an item.
      </p>
    </div>
  );
}
