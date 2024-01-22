import { AlignLeft } from 'lucide-react';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodType } from 'zod';
import { DescriptionRef, Todo } from '@/app/board/_types';
import { updateTodoDetails } from '@/app/board/_actions';
import { toast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { DRAFT_DESCRIPTION_STORAGE_KEY } from '@/app/board/_contexts';

const schema: ZodType<any> = z.object({
  description: z.string({
    required_error: 'Description is required',
    invalid_type_error: 'Description is required',
  }),
});
const Description = forwardRef(({ todo, handleTodoUpdate }: any, ref) => {
  const [isEditing, setIsEditing] = useState(false);
  const [hasDraftDescription, setHasDraftDescription] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      description: todo.description
    },
  });

  useEffect(() => {
    const draftedDescription = localStorage.getItem(DRAFT_DESCRIPTION_STORAGE_KEY);
    if (!draftedDescription) {
      return;
    }
    form.setValue('description', draftedDescription);
    setHasDraftDescription(true);
  }, []);

  useImperativeHandle(ref, () => ({
    draftDescription() {
      const { description } = form.getValues();
      if (description === todo.description) {
        return;
      }
      localStorage.setItem(DRAFT_DESCRIPTION_STORAGE_KEY, description);
    }
  }));

  const disableEditing = () => {
    setIsEditing(false);
  };
  const enableEditing = () => {
    setIsEditing(true);
  };

  const discardDescriptionChanges = () => {
    const hasDescriptionDrafted = localStorage.getItem(DRAFT_DESCRIPTION_STORAGE_KEY);
    if (hasDescriptionDrafted) {
      localStorage.removeItem(DRAFT_DESCRIPTION_STORAGE_KEY);
      form.resetField('description');
      disableEditing();
      setHasDraftDescription(false);
    }
  }

  const onSubmit = async ({ description }: z.infer<typeof schema>) => {
    if (description === todo.description) {
      return;
    }

    const { id } = todo;
    const details: Pick<Todo, 'id' | 'description'> = { id, description };

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
      localStorage.removeItem(DRAFT_DESCRIPTION_STORAGE_KEY);
      setHasDraftDescription(false);
      disableEditing();
    }
  };

  return (
    <div className="flex w-full items-start gap-x-3">
      <AlignLeft className="mt-0.5 h-5 w-5 text-neutral-700" />
      <div className="w-full">
        <div className="mb-2 flex items-center justify-between">
          <p className="font-semibold text-neutral-700">Description</p>
          {hasDraftDescription && (<Badge variant="secondary" className="rounded-sm"> Unsaved Changes</Badge>)}
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
              <Button
                disabled={false}
                type="submit"
                className="w-1/10 h-8 rounded-md bg-indigo-600 disabled:cursor-not-allowed">
                Submit
              </Button>
              {
                hasDraftDescription ? (
                  <Button type="button" variant="secondary" className="w-1/10 mx-4 h-8 rounded-md" onClick={discardDescriptionChanges}>
                    Discard Changes
                  </Button>
                ) : (
                  <Button type="button" variant="secondary" className="w-1/10 mx-4 h-8 rounded-md" onClick={disableEditing}>
                    Close
                  </Button>
                )
              }
            </form>
          </Form>
        ) : (
          <div
            role="button"
            onClick={enableEditing}
            className="min-h-32 rounded-md bg-neutral-100 px-3.5 py-3 text-sm font-normal hover:bg-neutral-200">
            {todo.description}
          </div>
        )}
      </div>
    </div>
  );
});

Description.displayName = 'Description';
export default Description;
