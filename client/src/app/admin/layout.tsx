import { FC, ReactNode } from 'react';

import { Box, Container, Flex } from '@chakra-ui/react';

import HeaderAdmin from '@/components/HeaderAdmin';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  return (
    <Flex direction="column" minH="100vh" bg="gray.50">
      <HeaderAdmin />

      <Container maxW="6xl">
        <Box>{children}</Box>
      </Container>
    </Flex>
  );
};

export default AdminLayout;
