import { Trash } from 'lucide-react';
import { FC } from 'react';

import { CardBody, CardRoot, HStack, IconButton, Text } from '@chakra-ui/react';
import { Exercise } from '@/types/exercise';

import EditExercise from '../EditExercise';

interface ExerciseComponentProps {
  exercise: Exercise;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

const ExerciseComponent: FC<ExerciseComponentProps> = ({
  exercise,
  onEdit,
  onDelete,
}) => {
  const { id, text } = exercise;

  const handleEdit = (newText: string) => onEdit(id, newText);
  const handleDelete = (id: string) => async () => await onDelete(id);
  return (
    <CardRoot
      key={exercise.id}
      colorPalette="gray"
      shadow="sm"
      borderRadius="xl"
    >
      <CardBody>
        <HStack justify="space-between">
          <Text fontSize="md">{text}</Text>
          <HStack m={1}>
            <EditExercise text={text} onEdit={handleEdit} />
            <IconButton
              aria-label="Удалить"
              size="sm"
              variant="ghost"
              colorScheme="red"
              onClick={handleDelete(exercise.id)}
            >
              <Trash />
            </IconButton>
          </HStack>
        </HStack>
      </CardBody>
    </CardRoot>
  );
};

export default ExerciseComponent;
