import { Badge } from '@/components/ui/badge';
import { ExpiryDateBadgeProps } from '@/app/board/_types';
import { DayRemainingAndColorMap, DayRemainingAndStatusMap } from '@/app/board/_constants';

const ExpiryDateBadge = ({ daysRemaining }: ExpiryDateBadgeProps) => {
  return (
    <Badge variant="custom" className={`mt-2 rounded-sm ${DayRemainingAndColorMap[daysRemaining]}`}>
      {DayRemainingAndStatusMap[daysRemaining]}
    </Badge>
  );
};

export default ExpiryDateBadge;
