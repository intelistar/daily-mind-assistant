import { format } from 'date-fns';

export const getFormatDate = (date: Date) =>
  format(new Date(date), 'dd.MM.yyyy');
