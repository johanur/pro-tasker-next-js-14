import { differenceInCalendarDays, parseISO } from 'date-fns';

export const getDaysRemaining = (expiryDate: string): number => {
  const parsedExpiryDate = parseISO(expiryDate);
  const currentDate = new Date();
  const differenceInDays = differenceInCalendarDays(parsedExpiryDate, currentDate);
  return differenceInDays < 0 ? -1 : differenceInDays;
};
