import { ReactNode } from 'react';

import {
  CloseButton,
  Dialog,
  DialogOpenChangeDetails,
  DialogRootProps,
} from '@chakra-ui/react';

interface ModalProps extends DialogRootProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

const Modal = ({ isOpen, onClose, children, title, ...props }: ModalProps) => {
  const handleOpenChange = (open: DialogOpenChangeDetails) =>
    !open && onClose();

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange} {...props}>
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger>
            <CloseButton size="sm" onClick={onClose} />
          </Dialog.CloseTrigger>
          <Dialog.Header>
            {title && <Dialog.Title>{title}</Dialog.Title>}
          </Dialog.Header>
          <Dialog.Body>{children}</Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default Modal;
