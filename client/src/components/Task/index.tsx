import { FC } from 'react';

import { Badge, Box, HStack, Text } from '@chakra-ui/react';
import { Task, TaskStatus } from '@/types/task';

import { getFormatDate } from '@/utils/getFormatDate';

interface TaskComponentProps {
  task: Task;
}

const TaskComponent: FC<TaskComponentProps> = ({ task }) => {
  const { text, status, dateSent } = task;
  const isCompleted = status === TaskStatus.COMPLETED;

  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      p={3}
      bg={isCompleted ? 'green.50' : 'gray.50'}
    >
      <HStack justify="space-between">
        <Text>{text}</Text>
        <Badge colorPalette={isCompleted ? 'green' : 'yellow'}>
          {isCompleted ? 'Выполнено' : 'Ожидает'}
        </Badge>
      </HStack>
      <Text fontSize="sm" color="gray.500" mt={1}>
        {getFormatDate(dateSent)}
      </Text>
    </Box>
  );
};

export default TaskComponent;
