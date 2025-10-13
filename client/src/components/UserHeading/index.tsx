'use client';

import { useEffect, useState } from 'react';

import { Avatar, Heading, HStack } from '@chakra-ui/react';
import { User } from '@/types/user';

import Loader from '../ui/Loader';

import { USER_KEY } from '@/constants/keys';
import { LocalStorage } from '@/utils/localStorage';

const UserHeading = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = LocalStorage.get<User>(USER_KEY);
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  if (!user) {
    return <Loader />;
  }

  return (
    <HStack p="4" mb="8">
      <Avatar.Icon name={user.name} />
      <Heading size="lg">Привет, {user.name}!</Heading>
    </HStack>
  );
};

export default UserHeading;
