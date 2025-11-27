'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HoverCard,
  Portal,
  Text,
} from '@chakra-ui/react';
import { User } from '@/types/user';

import Header from '../Header';
import Loader from '../ui/Loader';
import { toaster } from '../ui/toaster';

import { logout } from '@/api/auth/logout';
import { USER_KEY } from '@/constants/keys';
import { ROUTES } from '@/constants/routes';
import { LocalStorage } from '@/utils/localStorage';

const HeaderUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = LocalStorage.get<User>(USER_KEY);
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = async () => {
    const { success, message } = await logout();

    if (success) {
      toaster.create({
        type: 'success',
        description: message,
      });
      router.replace(ROUTES.login);
    } else {
      toaster.create({
        type: 'error',
        description: message,
      });
    }
  };

  if (!user) {
    return <Loader />;
  }

  return (
    <Header>
      <Flex align="center" gap="5">
        <HoverCard.Root>
          <HoverCard.Trigger>
            <Avatar.Root>
              <Avatar.Fallback name={user.name} />
            </Avatar.Root>
          </HoverCard.Trigger>
          <Portal>
            <HoverCard.Positioner>
              <HoverCard.Content>
                <Flex w="300" direction="column" align="center" gap={3}>
                  <Avatar.Icon name={user.name} boxSize="55px" />
                  <Box textAlign="center">
                    <Text fontWeight="medium">{user.name}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {user.email}
                    </Text>
                  </Box>
                  <Button
                    colorScheme="red"
                    size="sm"
                    width="100%"
                    mt={2}
                    onClick={handleLogout}
                  >
                    Выйти
                  </Button>
                </Flex>
              </HoverCard.Content>
            </HoverCard.Positioner>
          </Portal>
        </HoverCard.Root>

        <Heading size="lg">Привет, {user.name}!</Heading>
      </Flex>
    </Header>
  );
};

export default HeaderUser;
