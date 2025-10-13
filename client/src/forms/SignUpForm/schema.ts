import * as yup from 'yup';

export const signUpSchema = yup.object({
  email: yup
    .string()
    .email('Неправильный формат email')
    .required('Email обязателен'),
  name: yup
    .string()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .required('Имя обязателено'),
  password: yup
    .string()
    .min(4, 'Пароль должен содержать минимум 2 символа')
    .required('Пароль обязателен'),
});
