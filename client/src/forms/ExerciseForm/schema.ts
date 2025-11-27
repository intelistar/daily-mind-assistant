import * as yup from 'yup';

export const exerciseSchema = yup.object({
  text: yup
    .string()
    .min(5, 'Минимум должно быть 5 символов')
    .required('Текст обязателен'),
});
