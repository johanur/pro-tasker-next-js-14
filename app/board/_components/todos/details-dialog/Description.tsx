import { AlignLeft } from 'lucide-react';
import { useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodType } from 'zod';
import { Todo } from '@/app/board/_types';
import { updateTodoDetails } from '@/app/board/_actions';
import { toast } from '@/components/ui/use-toast';

const schema: ZodType<any> = z.object({
  description: z.string({
    required_error: 'Description is required',
    invalid_type_error: 'Description is required',
  }),
});
const Description = ({ todo, handleTodoUpdate }: any) => {
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

  const onSubmit = async({ description }: z.infer<typeof schema>) => {
    if (description === todo.description) {
      return;
    }

    const { id } = todo;
    const details: Pick<Todo, 'id' | 'description'> = { id, description }

    const { error, data } = await updateTodoDetails(details);

    if (error) {
      toast({
        duration: 4000,
        variant: 'destructive',
        title: 'Failed to update description',
        description: 'There was an error while updating the description. Please try again later',
      });
    } else {
      toast({
        duration: 4000,
        title: 'Description updated successfully',
        description: 'The new description has been updated successfully!',
      });
      handleTodoUpdate(data);
      disableEditing();
    }


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
              <Button disabled={false} type="submit" className="h-8 w-1/10 rounded-md bg-indigo-600 disabled:cursor-not-allowed">
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
          <div role="button" onClick={enableEditing} className="min-h-32 bg-neutral-100 hover:bg-neutral-200 text-sm font-normal py-3 px-3.5 rounded-md">
            {todo.description}
          </div>
        )}
      </div>
    </div>
  )
}

export default Description;
