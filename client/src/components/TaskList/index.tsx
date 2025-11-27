'use client';

import { Heading, Text, VStack } from '@chakra-ui/react';
import { Task } from '@/types/task';

import TaskComponent from '../Task';

import { NO_TASKS_TEXT } from './contsants';

type TaskListProps = {
  tasks: Task[];
};

export const TaskList = ({ tasks }: TaskListProps) => {
  if (!tasks.length) {
    return (
      <Text textAlign="center" color="gray.500">
        {NO_TASKS_TEXT}
      </Text>
    );
  }

  return (
    <VStack py={4} align="stretch">
      <Heading size="md" mb="2">
        История заданий
      </Heading>

      {tasks.map((task) => (
        <TaskComponent key={task.id} task={task} />
      ))}
    </VStack>
  );
};
