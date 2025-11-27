'use client';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  Box,
  Button,
  chakra,
  Field,
  Heading,
  Input,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { UserRole } from '@/types/user';

import { INITIAL_LOGIN_VALUES, loginForm } from './constants';
import { loginSchema } from './schema';

import { login } from '@/api/auth/login';
import { toaster } from '@/components/ui/toaster';
import { USER_KEY } from '@/constants/keys';
import { ROUTES } from '@/constants/routes';
import { LocalStorage } from '@/utils/localStorage';

export const LoginForm = () => {
  const router = useRouter();
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
    resetForm,
  } = useFormik({
    initialValues: INITIAL_LOGIN_VALUES,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const { email, password } = values;
      const userValues = {
        email,
        password,
      };
      const { success, message, data: user } = await login(userValues);

      toaster.create({
        type: success ? 'success' : 'error',
        description: message,
      });

      if (success || user) {
        resetForm();
        LocalStorage.set(USER_KEY, user);
        if (user?.role === UserRole.USER) router.replace(ROUTES.profile);
        else router.replace(ROUTES.admin_exercises);
      }
    },
  });
  return (
    <chakra.form
      onSubmit={handleSubmit}
      maxW="sm"
      mx="auto"
      mt="10"
      p="8"
      w="lg"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
      colorPalette="gray"
    >
      <Heading mb="6" size="lg" textAlign="center">
        Sign In
      </Heading>

      <Field.Root
        required
        invalid={Boolean(errors.email && touched.email)}
        pb="5"
        mb="2"
        position="relative"
      >
        <Field.Label>
          Email <Field.RequiredIndicator />
        </Field.Label>
        <Input
          {...loginForm.email}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Field.ErrorText fontSize="xs" position="absolute" bottom="0">
          {errors.email}
        </Field.ErrorText>
      </Field.Root>

      <Field.Root
        required
        invalid={Boolean(errors.password && touched.password)}
        mb="6"
        pb="5"
        position="relative"
      >
        <Field.Label>
          Password <Field.RequiredIndicator />
        </Field.Label>
        <Input
          {...loginForm.password}
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Field.ErrorText fontSize="xs" position="absolute" bottom="0">
          {errors.password}
        </Field.ErrorText>
      </Field.Root>

      <Button
        type="submit"
        colorScheme="blue"
        width="100%"
        size="md"
        fontWeight="medium"
      >
        Log In
      </Button>

      <Box textAlign="center" mt="4">
        <ChakraLink
          as={Link}
          href={ROUTES.signup}
          color="black.500"
          fontWeight="medium"
          fontSize="sm"
          _hover={{ textDecoration: 'underline', color: 'black.600' }}
        >
          Don’t have an account?
        </ChakraLink>
      </Box>
    </chakra.form>
  );
};
