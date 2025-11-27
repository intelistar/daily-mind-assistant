import { Edit2 } from 'lucide-react';
import { FC } from 'react';

import { IconButton } from '@chakra-ui/react';

import Modal from '../ui/Modal';

import ExerciseForm from '@/forms/ExerciseForm';
import { useModal } from '@/hooks/useModal';

interface EditExerciseProps {
  onEdit: (text: string) => void;
  text: string;
}

const EditExercise: FC<EditExerciseProps> = ({ onEdit, text }) => {
  const { isOpen, onOpen, onClose } = useModal();

  const handleEdit = async (text: string) => {
    await onEdit(text);
    onClose();
  };

  return (
    <>
      <IconButton
        aria-label="Редактировать"
        size="sm"
        variant="ghost"
        onClick={onOpen}
      >
        <Edit2 />
      </IconButton>
      <Modal isOpen={isOpen} onClose={onClose} title="Редактирование задачи">
        <ExerciseForm onSave={handleEdit} initialValue={text} />
      </Modal>
    </>
  );
};

export default EditExercise;
