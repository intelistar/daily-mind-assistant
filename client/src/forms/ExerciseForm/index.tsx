import { useFormik } from 'formik';
import { FC } from 'react';

import { Button, chakra, Field, Input } from '@chakra-ui/react';

import { exerciseForm, INITIAL_EXERCISE_VALUES } from './constants';
import { exerciseSchema } from './schema';

interface ExerciseFormProps {
  onSave: (text: string) => void;
  initialValue?: string;
}

const ExerciseForm: FC<ExerciseFormProps> = ({ onSave, initialValue }) => {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
    resetForm,
  } = useFormik({
    initialValues: initialValue
      ? { text: initialValue }
      : INITIAL_EXERCISE_VALUES,
    validationSchema: exerciseSchema,
    onSubmit: async (values) => {
      const { text } = values;

      await onSave(text);
      resetForm();
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
      <Field.Root
        required
        invalid={Boolean(errors.text && touched.text)}
        pb="5"
        mb="2"
        position="relative"
      >
        <Field.Label>
          Text <Field.RequiredIndicator />
        </Field.Label>
        <Input
          {...exerciseForm.text}
          value={values.text}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Field.ErrorText fontSize="xs" position="absolute" bottom="0">
          {errors.text}
        </Field.ErrorText>
      </Field.Root>

      <Button type="submit">Сохранить</Button>
    </chakra.form>
  );
};

export default ExerciseForm;
