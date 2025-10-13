import { Plus } from 'lucide-react';
import { FC } from 'react';

import { Button } from '@chakra-ui/react';

import createExerciseModal from '../ExerciseModal';

interface AddExerciseProps {
  onAdd: (text: string) => void;
}

const AddExercise: FC<AddExerciseProps> = ({ onAdd }) => {
  const handleAdd = () => {
    createExerciseModal.open('form', {
      onSubmit: onAdd,
    });
  };

  return (
    <>
      <Button colorScheme="teal" onClick={handleAdd} borderRadius="lg">
        <Plus /> Добавить
      </Button>
      <createExerciseModal.Viewport />
    </>
  );
};

export default AddExercise;
