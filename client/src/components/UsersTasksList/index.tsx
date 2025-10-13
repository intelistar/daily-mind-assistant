import { FC } from 'react';

import { Box, Text, VStack } from '@chakra-ui/react';
import { UserWithTasks } from '@/types/user';

import UserTask from '../UserTask';

import { NO_USERS_TEXT } from './constants';

interface UsersTasksListProps {
  users: UserWithTasks[];
}

const UsersTasksList: FC<UsersTasksListProps> = ({ users }) => {
  if (users.length === 0) {
    return (
      <Box textAlign="center" mt={10}>
        <Text color="gray.500" fontSize="lg">
          {NO_USERS_TEXT}
        </Text>
      </Box>
    );
  }

  return (
    <VStack align="stretch" w="100%" maxW="4xl" mx="auto" mt={7}>
      {users.map((user) => (
        <UserTask key={user.id} user={user} />
      ))}
    </VStack>
  );
};

export default UsersTasksList;
