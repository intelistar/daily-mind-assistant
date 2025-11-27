import { FC, ReactNode } from 'react';

import { Container, Flex } from '@chakra-ui/react';

import HeaderUser from '@/components/HeaderUser';

interface AdminLayoutProps {
  children: ReactNode;
}

const Layout: FC<AdminLayoutProps> = ({ children }) => {
  return (
    <Flex direction="column" minH="100vh" bg="bg">
      <HeaderUser />

      <Container maxW="6xl">{children}</Container>
    </Flex>
  );
};

export default Layout;
