import { Edit2 } from 'lucide-react';
import { FC } from 'react';

import { IconButton } from '@chakra-ui/react';

import createExerciseModal from '../ExerciseModal';

interface EditExerciseProps {
  onEdit: (text: string) => void;
  text: string;
}

const EditExercise: FC<EditExerciseProps> = ({ onEdit, text }) => {
  const handleEdit = () => {
    createExerciseModal.open('form', {
      onSubmit: onEdit,
      initialText: text,
    });
  };

  return (
    <>
      <IconButton
        aria-label="Редактировать"
        size="sm"
        variant="ghost"
        onClick={handleEdit}
      >
        <Edit2 />
      </IconButton>
      <createExerciseModal.Viewport />
    </>
  );
};

export default EditExercise;
