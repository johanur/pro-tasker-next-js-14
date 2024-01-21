import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar as CalendarIcon, CalendarClock, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { ZodType } from 'zod';
import { addDays, format, isBefore } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';

const schema: ZodType<any> = z.object({
  expiryDate: z.date({
    required_error: 'Expiry date is required',
    invalid_type_error: 'Expiry date is required',
  }),
});
const ExpiryDatepicker = ({ todo }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const oneDayBefore = addDays(new Date(), -1);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      expiryDate: todo.expire_date,
    },
  });

  const disableEditing = () => {
    setIsEditing(false);
  };
  const enableEditing = () => {
    setIsEditing(true);
    setIsCalendarOpen(true)
  }

  const onSubmit = () => {
  }

  return (
    <div className="flex items-center gap-x-3 w-full h-10 mb-2">
      <CalendarClock className="h-5 w-5 .5 text-neutral-700" />
      <div  className="grid grid-cols-8 gap-6 w-full h-full items-center">
        <div className="col-span-2">
          <p className="font-semibold text-neutral-700 tx-md">
            Expire Date
          </p>
        </div>
        <div className="col-span-6 items-center">
          {isEditing? (
            <div className="flex w-full flex-1 gap-2 items-center">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-grow">
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
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
                </form>
              </Form>
              <Button className="bg-transparent hover:bg-transparent p-0">
                <Check className="flex-grow-0 text-black" size={20} />
              </Button>
              <Button className="bg-transparent hover:bg-transparent p-0" onClick={disableEditing}>
                <X className="flex-grow-0 text-black" size={20} />
              </Button>
            </div>
            ) : (
            <div role="button" onClick={enableEditing} className="font-normal text-sm hover:bg-neutral-200 hover:py-0.5">
              {format(todo.expire_date, 'PPP')}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ExpiryDatepicker;
