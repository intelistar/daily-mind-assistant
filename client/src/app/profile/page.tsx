import { Box, Heading } from '@chakra-ui/react';

import { getAllTasks } from '@/api/tasks/getAllTasks';
import { getTodayTask } from '@/api/tasks/getTodayTask';
import CurrentTask from '@/components/CurrentTask';
import { TaskList } from '@/components/TaskList';

const NO_CURRENT_TASK = 'Нет заданий на сегодня';

const ProfilePage = async () => {
  const { data: currentTask } = await getTodayTask();
  const { data: tasks } = await getAllTasks();

  return (
    <Box w="100%" py="8">
      {currentTask ? (
        <CurrentTask task={currentTask} />
      ) : (
        <Heading textAlign="center">{NO_CURRENT_TASK}</Heading>
      )}

      {tasks && <TaskList tasks={tasks} />}
    </Box>
  );
};

export default ProfilePage;
