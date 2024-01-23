import { forwardRef, useImperativeHandle, useState } from 'react';

import { ActivityIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

import ActivityItem from './ActivityItem';
import { getActivityLogs } from '@/app/board/_actions';
import { ActivityLog, ActivityProps } from '@/app/board/_types';

const Activity = forwardRef(({ todoId }: ActivityProps, ref) => {
  const [showActivity, setShowActivity] = useState<boolean>(false);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onHideDetails = () => {
    setShowActivity(false);
  };
  const onShowDetails = () => {
    setShowActivity(true);

    // In-memory caching in the client
    if (activities.length) {
      console.log('log has data');
      return;
    }

    fetchActivities();
  };

  useImperativeHandle(ref, () => {
    return {
      fetchActivities: fetchActivities,
    };
  });

  const fetchActivities = async () => {
    setIsLoading(true);

    try {
      const { error, data } = await getActivityLogs(todoId);

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Failed to fetch activities',
          description: 'There was an error while fetching the activities. Please try again later',
        });
        return;
      }

      setActivities(data);
    } catch {
      toast({
        variant: 'destructive',
        title: 'Something Went Wrong!',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-2 flex w-full items-start gap-x-3">
      <ActivityIcon className="mt-0.5 h-5 w-5 text-neutral-700" />
      <div className="w-full">
        <div className="flex justify-between">
          <p className="mb-5 font-semibold text-neutral-700">Activity</p>
          {showActivity ? (
            <Button
              disabled={isLoading}
              onClick={onHideDetails}
              variant="secondary"
              className="h-6 w-1/5 rounded-sm bg-slate-300 hover:bg-slate-200">
              Hide Details
            </Button>
          ) : (
            <Button onClick={onShowDetails} className="h-6 w-1/5 rounded-sm bg-indigo-600 hover:bg-indigo-500">
              Show Details
            </Button>
          )}
        </div>
        {showActivity &&
          (isLoading ? (
            <h1 className="mt-2 text-center text-neutral-700">Fetching Activities....</h1>
          ) : (
            <div className="max-h-60 overflow-auto ">
              <ol className="mt-2 space-y-4">
                {activities.map(item => (
                  <ActivityItem key={item.id} title={item.category_title} createdAt={item.created_at} />
                ))}
              </ol>
            </div>
          ))}
      </div>
    </div>
  );
});

Activity.displayName = 'Activity';

export default Activity;
