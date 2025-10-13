'use client';

import { Badge, Box, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { Task, TaskStatus } from '@/types/task';

import { NO_TASKS_TEXT } from './contsants';

import { getFormatDate } from '@/utils/getFormatDate';

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
    <VStack p={4} align="stretch">
      <Heading size="md" mb="2">
        История заданий
      </Heading>

      {tasks.map(({ text, status, id, dateSent }) => (
        <Box
          key={id}
          borderWidth="1px"
          borderRadius="xl"
          p="4"
          bg="white"
          boxShadow="sm"
        >
          <HStack justify="space-between" mb="1">
            <Text fontWeight="bold">{text}</Text>
            <Badge
              colorPalette={status === TaskStatus.COMPLETED ? 'green' : 'gray'}
            >
              {status === TaskStatus.COMPLETED ? 'Выполнено' : 'В ожидании'}
            </Badge>
          </HStack>
          <Text fontSize="sm" color="gray.500">
            {getFormatDate(dateSent)}
          </Text>
        </Box>
      ))}
    </VStack>
  );
};
