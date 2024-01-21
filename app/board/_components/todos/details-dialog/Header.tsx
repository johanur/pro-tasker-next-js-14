import { Calendar as CalendarIcon, Layout } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { addTodo } from '@/app/board/_actions';
import { toast } from '@/components/ui/use-toast';
import { Todo, TodoFormData } from '@/app/board/_types';
import { ZodType } from 'zod';
import { useRef } from 'react';
import ExpiryDateBadge from '@/app/board/_components/ExpiryDateBadge';

const schema: ZodType<any> = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title is required',
    })
    .min(3, {
      message: 'Title is too short.',
    }),
});

const Header = ({ todo }: any) => {

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      title: todo.title,
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    console.log('Log Here values: ', values);
  };


  return (
    <div className="mb-6 flex w-full items-start gap-x-3">
      <Layout className="mt-1 h-5 w-5 text-neutral-700 mt-2.5" />
      <div className="w-full">
        <Form {...form}>
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem >
                <FormControl >
                  <Input
                    className="relative -left-1.5 h-9 w-[95%] rounded-sm border-transparent bg-transparent px-1 text-lg font-semibold text-neutral-700 focus-visible:ring-1 truncate"
                    placeholder="Enter a title..."
                    {...form.register('title', { onBlur: form.handleSubmit(onSubmit)})}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </Form>
        <ExpiryDateBadge daysRemaining={todo.daysRemaining}/>
      </div>
    </div>
  );
};

export default Header;
