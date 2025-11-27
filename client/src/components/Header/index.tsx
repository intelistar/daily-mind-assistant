import { FC, ReactNode } from 'react';

import { Box, Flex } from '@chakra-ui/react';

import ToggleTheme from '../ToggleTheme';

interface HeaderProps {
  children: ReactNode;
}

const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <Box
      as="header"
      bg="bg"
      borderBottom="1px solid"
      borderColor="border"
      py={3}
      px={6}
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex m="auto" justify="space-between" align="center" maxW="6xl">
        {children}

        <ToggleTheme />
      </Flex>
    </Box>
  );
};

export default Header;
