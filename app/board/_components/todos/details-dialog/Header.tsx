import { Layout } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodType } from 'zod';
import ExpiryDateBadge from '@/app/board/_components/ExpiryDateBadge';
import { updateTodoDetails } from '@/app/board/_actions';
import { toast } from '@/components/ui/use-toast';
import { Todo } from '@/app/board/_types';

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

  const onSubmit = async ({ title }: z.infer<typeof schema>) => {
    if (title === todo.title) {
      return;
    }

    const data: Pick<Todo, 'title' | 'id'> = {
      title: title,
      id: todo.id,
    }

    const { error } = await updateTodoDetails(data);

    if (error) {
      toast({
        duration: 4000,
        variant: 'destructive',
        title: 'Failed to update title',
        description: 'There was an error while updating the title. Please try again later',
      });
    } else {
      toast({
        duration: 4000,
        title: 'Title updated successfully',
        description: 'The new title has been updated successfully!',
      });
    }
  };


  return (
    <div className="mb-6 flex w-full items-start gap-x-3">
      <Layout className="h-5 w-5 text-neutral-700 mt-2.5" />
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
