import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar as CalendarIcon, CalendarClock, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { addDays, format, isBefore } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { updateTodoDetails } from '@/app/board/_actions';
import { toast } from '@/components/ui/use-toast';
import { Todo, TodoDetailsComponentsProps } from '@/app/board/_types';
import { ExpiryDateSchema } from '@/app/board/_schema';


const ExpiryDatepicker = ({ todo, handleTodoUpdate }: TodoDetailsComponentsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const oneDayBefore = addDays(new Date(), -1);

  const form = useForm<z.infer<typeof ExpiryDateSchema>>({
    resolver: zodResolver(ExpiryDateSchema),
    defaultValues: {
      expiryDate: new Date(todo.expire_date),
    },
  });

  const enableEditing = () => {
    setIsEditing(true);
    setIsCalendarOpen(true);
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onSubmit = async ({ expiryDate }: z.infer<typeof ExpiryDateSchema>) => {
    const date = format(expiryDate, 'yyyy-MM-dd');

    if (date === todo.expire_date) {
      return;
    }

    setIsSubmitting(true);

    const details: Pick<Todo, 'id' | 'expire_date'> = {
      id: todo.id,
      expire_date: date,
    };

    try {
      const { error, data } = await updateTodoDetails(details);

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Failed to update expire date',
          description: 'There was an error while updating the expire date. Please try again later',
        });
        return;
      }

      toast({
        title: 'Expire date updated successfully',
        description: 'The new expire date has been updated successfully!',
      });
      handleTodoUpdate(data);
      disableEditing();
    } catch {
      toast({
        variant: 'destructive',
        title: 'Something went wrong!',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-2 flex h-10 w-full items-center gap-x-3">
      <CalendarClock className=".5 h-5 w-5 text-neutral-700" />
      <div className="grid h-full w-full grid-cols-8 items-center gap-6">
        <div className="col-span-2">
          <p className="tx-md font-semibold text-neutral-700">Expire Date</p>
        </div>
        <div className="col-span-6 items-center">
          {isEditing ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex-grow space-y-8">
                <div className="flex w-full flex-1 items-center gap-2">
                  <div className="flex-grow">
                    <FormField
                      control={form.control}
                      name="expiryDate"
                      render={({ field }) => (
                        <FormItem>
                          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  disabled={isSubmitting}
                                  variant={'outline'}
                                  className={cn(
                                    'flex w-full justify-start pl-3 font-normal',
                                    !field.value && 'text-muted-foreground'
                                  )}>
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <div className="m-1 flex">
                                <div className="flex-1"></div>
                              </div>

                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={e => {
                                  field.onChange(e);
                                  setIsCalendarOpen(false);
                                }}
                                disabled={date => isBefore(date, oneDayBefore)}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button disabled={isSubmitting} className="bg-transparent p-0 hover:bg-transparent">
                    <Check className="flex-grow-0 text-black" size={20} />
                  </Button>
                  <Button disabled={isSubmitting} className="bg-transparent p-0 hover:bg-transparent" onClick={disableEditing}>
                    <X className="flex-grow-0 text-black" size={20} />
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <div
              role="button"
              onClick={enableEditing}
              className="text-sm font-normal hover:bg-neutral-200 hover:py-0.5">
              {format(todo.expire_date, 'PPP')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpiryDatepicker;
