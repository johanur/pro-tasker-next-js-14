import { useState } from 'react';

import { Layout } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ExpiryDateBadge from '@/app/board/_components/ExpiryDateBadge';
import { updateTodoDetails } from '@/app/board/_actions';
import { toast } from '@/components/ui/use-toast';
import { Todo, TodoDetailsComponentsProps } from '@/app/board/_types';
import { TodoTitleSchema } from '@/app/board/_schema';


const Header = ({ todo, handleTodoUpdate }: TodoDetailsComponentsProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof TodoTitleSchema>>({
    resolver: zodResolver(TodoTitleSchema),
    mode: 'onBlur',
    defaultValues: {
      title: todo.title,
    },
  });

  const onSubmit = async ({ title }: z.infer<typeof TodoTitleSchema>) => {
    if (title === todo.title) {
      return;
    }

    setIsSubmitting(true);
    const details: Pick<Todo, 'id' | 'title'> = {
      title: title,
      id: todo.id,
    };

    try {
      const { data, error } = await updateTodoDetails(details);

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Failed to update title',
          description: 'There was an error while updating the title. Please try again later',
        });
        return;
      }

      toast({
        title: 'Title updated successfully',
        description: 'The new title has been updated successfully!',
      });
      handleTodoUpdate(data);

    } catch {
      toast({
        variant: 'destructive',
        title: 'Something wrong wrong!',
      });
    } finally {
      setIsSubmitting(false);
    }

  };

  return (
    <div className="mb-6 flex w-full items-start gap-x-3">
      <Layout className="mt-2.5 h-5 w-5 text-neutral-700" />
      <div className="w-full">
        <Form {...form}>
          <FormField
            name="title"
            control={form.control}
            render={() => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    className="relative -left-1.5 h-9 w-[95%] truncate rounded-sm border-transparent bg-transparent px-1 text-lg font-semibold text-neutral-700 focus-visible:ring-1"
                    placeholder="Enter a title..."
                    {...form.register('title', { onBlur: form.handleSubmit(onSubmit) })}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </Form>
        <ExpiryDateBadge daysRemaining={todo.daysRemaining} />
      </div>
    </div>
  );
};

export default Header;
