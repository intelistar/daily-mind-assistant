import { startOfDay, startOfWeek, startOfMonth } from 'date-fns';

export const getPeriodStartDates = (date: Date) => ({
  day: startOfDay(date),
  week: startOfWeek(date, { weekStartsOn: 1 }),
  month: startOfMonth(date),
});
