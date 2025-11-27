'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button, Heading, HStack } from '@chakra-ui/react';

import Header from '../Header';

import { navLinks } from './constants';

const HeaderAdmin = () => {
  const pathname = usePathname();

  return (
    <Header>
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
    </Header>
  );
};

export default HeaderAdmin;
