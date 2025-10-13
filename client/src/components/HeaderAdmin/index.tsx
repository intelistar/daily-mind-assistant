'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Box, Button, Flex, Heading, HStack } from '@chakra-ui/react';

import { navLinks } from './constants';

const HeaderAdmin = () => {
  const pathname = usePathname();

  return (
    <Box
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.200"
      py={3}
      px={6}
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex m="auto" justify="space-between" align="center" maxW="6xl">
        <Heading size="md">Админ-панель</Heading>

        <HStack p={4}>
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Button
                key={href}
                colorScheme={isActive ? 'blue' : undefined}
                variant={isActive ? 'solid' : 'ghost'}
                size="sm"
              >
                <Link href={href}>{label}</Link>
              </Button>
            );
          })}
        </HStack>
      </Flex>
    </Box>
  );
};

export default HeaderAdmin;
