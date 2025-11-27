import { Box, Center, Heading, Text, VStack } from '@chakra-ui/react';

import { getAllExercises } from '@/api/exercises/getAllExercises';
import ExercisesList from '@/components/ExercisesList';

const AdminExercisesPage = async () => {
  const { success, message, data: exercises } = await getAllExercises();

  if (!success || !exercises) {
    return (
      <Center minH="60vh">
        <VStack m={4}>
          <Text fontSize="lg" color="gray.500">
            {message}
          </Text>
        </VStack>
      </Center>
    );
  }
  return (
    <Box py={10}>
      <VStack m={2} align="stretch">
        <Box textAlign="center">
          <Heading size="2xl" mb={2}>
            🧘‍♀️ Задания
          </Heading>
        </Box>

        <ExercisesList exercises={exercises} />
      </VStack>
    </Box>
  );
};

export default AdminExercisesPage;
