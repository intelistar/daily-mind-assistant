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

import { INITIAL_SIGNUP_VALUES, signUpForm } from './constants';
import { signUpSchema } from './schema';

import { signUp } from '@/api/auth/signUp';
import { toaster } from '@/components/ui/toaster';
import { USER_KEY } from '@/constants/keys';
import { ROUTES } from '@/constants/routes';

export const SignUpForm = () => {
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
    initialValues: INITIAL_SIGNUP_VALUES,
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      const { email, name, password } = values;
      const newUser = {
        email,
        name,
        password,
      };
      const { success, message, data: user } = await signUp(newUser);
      toaster.create({
        type: success ? 'success' : 'error',
        description: message,
      });

      if (success || user) {
        resetForm();

        localStorage.set(USER_KEY, user);

        router.replace(ROUTES.profile);
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
      bg="white"
    >
      <Heading mb="6" size="lg" textAlign="center">
        Sign Up
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
          {...signUpForm.email}
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
        invalid={Boolean(errors.name && touched.name)}
        pb="5"
        mb="2"
        position="relative"
      >
        <Field.Label>
          Name <Field.RequiredIndicator />
        </Field.Label>
        <Input
          {...signUpForm.name}
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Field.ErrorText fontSize="xs" position="absolute" bottom="0">
          {errors.name}
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
          {...signUpForm.password}
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
        Sign up
      </Button>

      <Box textAlign="center" mt="4">
        <ChakraLink
          as={Link}
          href={ROUTES.login}
          color="black.500"
          fontWeight="medium"
          fontSize="sm"
          _hover={{ textDecoration: 'underline', color: 'black.600' }}
        >
          Already have an account?
        </ChakraLink>
      </Box>
    </chakra.form>
  );
};
