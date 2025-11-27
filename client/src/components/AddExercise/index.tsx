import { Plus } from 'lucide-react';
import { FC } from 'react';

import { IconButton } from '@chakra-ui/react';

import Modal from '../ui/Modal';

import ExerciseForm from '@/forms/ExerciseForm';
import { useModal } from '@/hooks/useModal';

interface AddExerciseProps {
  onAdd: (text: string) => void;
}

const AddExercise: FC<AddExerciseProps> = ({ onAdd }) => {
  const { isOpen, onOpen, onClose } = useModal();

  const handleAdd = async (text: string) => {
    await onAdd(text);
    onClose();
  };

  return (
    <>
      <IconButton colorScheme="teal" onClick={onOpen} borderRadius="lg">
        <Plus />
      </IconButton>
      <Modal isOpen={isOpen} onClose={onClose} title="Добавление задачи">
        <ExerciseForm onSave={handleAdd} />
      </Modal>
    </>
  );
};

export default AddExercise;
