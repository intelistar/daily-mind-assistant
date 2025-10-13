import { Box } from '@chakra-ui/react';

import { getAllTasks } from '@/api/tasks/getAllTasks';
import { getTodayTask } from '@/api/tasks/getTodayTask';
import CurrentTask from '@/components/CurrentTask';
import { TaskList } from '@/components/TaskList';
import UserHeading from '@/components/UserHeading';

const ProfilePage = async () => {
  const { data: currentTask } = await getTodayTask();
  const { data: tasks } = await getAllTasks();

  if (!currentTask || !tasks) return null;

  return (
    <Box maxW="3xl" mx="auto" px="4" py="8">
      <UserHeading />
      <CurrentTask task={currentTask} />

      <TaskList tasks={tasks} />
    </Box>
  );
};

export default ProfilePage;
