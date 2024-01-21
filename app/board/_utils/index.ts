import { BadgeInfo } from '@/app/board/_types';
import { ExpiryStatus } from '@/app/board/_enums/board';

export const getBadgeInfo = (daysRemaining: number): BadgeInfo => {
  let colorClass, expireStatus;

  switch (true) {
    case daysRemaining === ExpiryStatus.ExpiresIn2Days:
      colorClass = 'bg-[#808080]';
      expireStatus = 'Expires in 2 days';
      break;
    case daysRemaining === ExpiryStatus.ExpiresIn1Day:
      colorClass = 'bg-[#F4BB44]';
      expireStatus = 'Expires in 1 day';
      break;
    case daysRemaining === ExpiryStatus.ExpiresToday:
      colorClass = 'bg-[#ff6347]';
      expireStatus = 'Expires Today';
      break;
    case daysRemaining < ExpiryStatus.ExpiresToday:
      colorClass = 'bg-[#FF0000]';
      expireStatus = 'Expired';
      break;
    default:
      colorClass = 'bg-[#000000]';
      expireStatus = 'Unknown';
  }

  return { colorClass, expireStatus };
};



