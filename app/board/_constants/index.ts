import { DayRemaining } from '@/app/board/_enums';

export const DayRemainingAndColorMap = {
  [DayRemaining.In2Days]: 'bg-[#808080]',
  [DayRemaining.In1Day]: 'bg-[#F4BB44]',
  [DayRemaining.Today]: 'bg-[#FF6347]',
  [DayRemaining.Expired]: 'bg-[#FF0000]',
};

export const DayRemainingAndStatusMap = {
  [DayRemaining.In2Days]: 'Expires in 2 days',
  [DayRemaining.In1Day]: 'Expires in 1 day',
  [DayRemaining.Today]: 'Expires Today',
  [DayRemaining.Expired]: 'Expired',
};
