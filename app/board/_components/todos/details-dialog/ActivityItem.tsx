import { format } from 'date-fns';
import { ActivityItemProps } from '@/app/board/_types';

const ActivityItem = ({ title, createdAt }: ActivityItemProps) => {
  const updatedDate = format(createdAt, 'MMM dd yyyy HH:mm')
  return (
    <li className="flex items-center gap-x-2">
      <div className="flex flex-col space-y-0.5">
        <p className="text-sm text-muted-foreground">
            Has been moved to <span className="font-semibold text-neutral-700">{title}</span> on <span className="font-semibold text-neutral-700">{updatedDate}</span>
        </p>
      </div>
    </li>
  )
}

export default ActivityItem;
