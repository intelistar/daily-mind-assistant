import { Heading, HStack, Spinner } from '@chakra-ui/react';

const Loader = () => {
  return (
    <HStack p="4" mb="8">
      <Spinner size="sm" />
      <Heading size="md">Загрузка...</Heading>
    </HStack>
  );
};

export default Loader;
