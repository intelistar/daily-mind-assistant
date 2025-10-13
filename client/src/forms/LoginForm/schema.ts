import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup
    .string()
    .email('Неправильный формат email')
    .required('Email обязателен'),
  password: yup.string().required('Пароль обязателен'),
});
