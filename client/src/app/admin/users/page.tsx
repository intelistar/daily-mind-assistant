'use server';
import { Box, Center, Heading, Text, VStack } from '@chakra-ui/react';

import { getAllUsersWithTasks } from '@/api/tasks/getAllUsersWithTasks';
import UsersTasksList from '@/components/UsersTasksList';

const ERROR_USERS = 'Не удалось загрузить пользователей';

const AdminUsersPage = async () => {
  const { success, message, data } = await getAllUsersWithTasks();

  if (!success || !data) {
    return (
      <Center minH="60vh">
        <VStack m={4}>
          <Text fontSize="lg" color="gray.500">
            {message || ERROR_USERS}
          </Text>
        </VStack>
      </Center>
    );
  }

  return (
    <Box py={10}>
      <VStack m={8} align="stretch">
        <Box textAlign="center">
          <Heading size="lg" mb={2}>
            👥 Пользователи и их задания
          </Heading>
          <Text color="gray.500" fontSize="md">
            Здесь вы можете просмотреть всех пользователей и статус выполнения
            их заданий
          </Text>
        </Box>

        <UsersTasksList users={data} />
      </VStack>
    </Box>
  );
};

export default AdminUsersPage;
