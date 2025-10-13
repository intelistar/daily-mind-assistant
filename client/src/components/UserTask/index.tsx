import { FC } from 'react';

import {
  Badge,
  Collapsible,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Task } from '@/types/task';
import { UserWithTasks } from '@/types/user';

import TaskComponent from '../Task';

import { NO_TASKS } from './constants';

interface UserTaskProps {
  user: UserWithTasks;
}

const UserTask: FC<UserTaskProps> = ({ user }) => {
  return (
    <Collapsible.Root
      key={user.id}
      borderWidth="1px"
      borderRadius="xl"
      overflow="hidden"
      boxShadow="md"
      bg="white"
    >
      <Collapsible.Trigger bg="blue.50" p={4} w="100%">
        <HStack justify="space-between">
          <Heading size="md">{user.name}</Heading>
          <Badge>{user.email}</Badge>
        </HStack>
      </Collapsible.Trigger>

      <Collapsible.Content p={4}>
        {user.tasks.length > 0 ? (
          <VStack align="stretch" p={3}>
            {user.tasks.map((task: Task) => (
              <TaskComponent key={task.id} task={task} />
            ))}
          </VStack>
        ) : (
          <Text color="gray.400">{NO_TASKS}</Text>
        )}
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export default UserTask;
