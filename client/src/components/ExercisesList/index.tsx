'use client';

import { FC, useState } from 'react';

import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { Exercise } from '@/types/exercise';

import AddExercise from '../AddExercise';
import ExerciseComponent from '../Exercise';
import { toaster } from '../ui/toaster';

import { createExercise } from '@/api/exercises/createExercise';
import { deleteExercise } from '@/api/exercises/deleteExercise';
import { updateExercise } from '@/api/exercises/updateExercise';

interface ExercisesListProps {
  exercises: Exercise[];
}

const ExercisesList: FC<ExercisesListProps> = ({
  exercises: dataExercises,
}) => {
  const [exercises, setExercises] = useState<Exercise[]>(dataExercises);

  const handleAddExercise = async (text: string) => {
    const { data: newExercise, success, message } = await createExercise(text);
    if (success && newExercise) {
      setExercises((prev) => [newExercise, ...prev]);
    } else {
      toaster.create({
        type: 'error',
        description: message,
      });
    }
  };

  const handleEditExercise = async (id: string, text: string) => {
    const {
      data: updatedExercise,
      success,
      message,
    } = await updateExercise(id, text);
    if (success && updatedExercise) {
      setExercises((prev) =>
        prev.map((exercise) =>
          exercise.id === updatedExercise.id ? updatedExercise : exercise,
        ),
      );
    } else {
      toaster.create({
        type: 'error',
        description: message,
      });
    }
  };

  const handleDeleteExercise = async (id: string) => {
    const {
      success,
      message,
      data: deletedExerciseId,
    } = await deleteExercise(id);
    if (success && deletedExerciseId) {
      setExercises((prev) =>
        prev.filter((exercise) => exercise.id !== deletedExerciseId),
      );
    } else {
      toaster.create({
        type: 'error',
        description: message,
      });
    }
  };

  return (
    <Box>
      <HStack justify="flex-end" mb={5}>
        <AddExercise onAdd={handleAddExercise} />
      </HStack>

      {exercises.length === 0 ? (
        <Text color="gray.500" textAlign="center">
          Пока нет упражнений 😔
        </Text>
      ) : (
        <VStack align="stretch">
          {exercises.map((exercise) => (
            <ExerciseComponent
              key={exercise.id}
              exercise={exercise}
              onEdit={handleEditExercise}
              onDelete={handleDeleteExercise}
            />
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default ExercisesList;
