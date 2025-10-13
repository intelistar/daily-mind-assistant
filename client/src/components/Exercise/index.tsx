import { FC } from 'react';

import { CardBody, CardRoot, HStack, Text } from '@chakra-ui/react';
import { Exercise } from '@/types/exercise';

import EditExercise from '../EditExercise';

interface ExerciseComponentProps {
  exercise: Exercise;
  onEdit: (id: string, text: string) => void;
}

const ExerciseComponent: FC<ExerciseComponentProps> = ({
  exercise,
  onEdit,
}) => {
  const { id, text } = exercise;

  const handleEdit = (newText: string) => onEdit(id, newText);
  return (
    <CardRoot key={exercise.id} bg="gray.50" shadow="sm" borderRadius="xl">
      <CardBody>
        <HStack justify="space-between">
          <Text fontSize="md">{text}</Text>
          <HStack m={1}>
            <EditExercise text={text} onEdit={handleEdit} />
            {/* <IconButton
              aria-label="Удалить"
              size="sm"
              variant="ghost"
              colorScheme="red"
              // onClick={() => onDelete(exercise.id)}
            >
              <Trash />
            </IconButton> */}
          </HStack>
        </HStack>
      </CardBody>
    </CardRoot>
  );
};

export default ExerciseComponent;
