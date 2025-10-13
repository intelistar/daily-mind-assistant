'use client';
import React, { FC, startTransition, useOptimistic } from 'react';

import { Box, Button, Heading, VStack } from '@chakra-ui/react';
import { Task, TaskStatus } from '@/types/task';

import { toaster } from '../ui/toaster';

import { completeTask } from '@/api/tasks/completeTask';

interface CurrentTaskProps {
  task: Task;
}

const CurrentTask: FC<CurrentTaskProps> = ({ task }) => {
  const [optimisticTask, updateTask] = useOptimistic(
    task,
    (draft, newTask: Task) => ({
      ...draft,
      status: newTask.status,
    }),
  );

  const handleComplete = async () => {
    startTransition(() =>
      updateTask({ ...optimisticTask, status: TaskStatus.COMPLETED }),
    );

    try {
      const a = await completeTask(task.id);
      console.log(a);

      toaster.create({
        title: 'Задание выполнено!',
        type: 'success',
      });
    } catch {
      toaster.create({
        title: 'Ошибка',
        description: 'Не удалось выполнить задание',
        type: 'error',
      });

      startTransition(() =>
        updateTask({ ...optimisticTask, status: TaskStatus.PENDING }),
      );
    }
  };

  const isCompleted = optimisticTask.status === TaskStatus.COMPLETED;

  return (
    <Box
      borderWidth="1px"
      borderRadius="xl"
      p="6"
      bg="white"
      boxShadow="md"
      maxW="2xl"
      mx="auto"
    >
      <VStack align="stretch" p={4}>
        <Heading size="md">{task.text}</Heading>

        {!isCompleted ? (
          <Button colorScheme="blue" size="md" onClick={handleComplete}>
            Выполнить
          </Button>
        ) : (
          <Button colorScheme="green" size="md" disabled>
            Выполнено
          </Button>
        )}
      </VStack>
    </Box>
  );
};

export default CurrentTask;
