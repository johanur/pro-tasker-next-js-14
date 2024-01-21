import { AlignLeft, Calendar as CalendarIcon, Check, Pencil, X } from 'lucide-react';
import { useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format, isBefore } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodType } from 'zod';

const schema: ZodType<any> = z.object({
  description: z.string({
    required_error: 'Description is required',
    invalid_type_error: 'Description is required',
  }),
});
const Description = ({ todo }: any) => {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      description: todo.description,
    },
  });

  const disableEditing = () => {
    setIsEditing(false);
  };
  const enableEditing = () => {
    setIsEditing(true);
  }

  const onSubmit = () => {
  }

  return (
    <div className="flex items-start gap-x-3 w-full">
      <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />
      <div className="w-full">
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold text-neutral-700">
            Description
          </p>
        </div>
        {isEditing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="Add a more details description..." {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="h-8 w-1/10 rounded-md bg-indigo-600">
                Submit
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="mx-4 h-8 w-1/10 rounded-md"
                onClick={disableEditing}>
                Close
              </Button>
            </form>
          </Form>
        ) : (
          <div role="button" onClick={enableEditing} className="min-h-[78px] bg-neutral-100 hover:bg-neutral-200 text-sm font-normal py-3 px-3.5 rounded-md">
            {todo.description}
          </div>
        )}
      </div>
    </div>
  )
}

export default Description;
