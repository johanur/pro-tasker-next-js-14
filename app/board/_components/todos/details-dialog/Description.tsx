import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import * as z from 'zod';
import { AlignLeft } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Todo, TodoDetailsComponentsProps } from '@/app/board/_types';
import { updateTodoDetails } from '@/app/board/_actions';
import { toast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { DRAFT_DESCRIPTION_STORAGE_KEY } from '@/app/board/_constants';
import { DescriptionSchema } from '@/app/board/_schema';

const Description = forwardRef(({ todo, handleTodoUpdate }: TodoDetailsComponentsProps, ref) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasDraftDescription, setHasDraftDescription] = useState(false);

  const form = useForm<z.infer<typeof DescriptionSchema>>({
    resolver: zodResolver(DescriptionSchema),
    mode: 'onBlur',
    defaultValues: {
      description: todo.description,
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
    },
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
      removeDraftDescriptionFromStorage();
      disableEditing();
      form.resetField('description');
      setHasDraftDescription(false);
    }
  };

  const removeDraftDescriptionFromStorage = () => {
    localStorage.removeItem(DRAFT_DESCRIPTION_STORAGE_KEY);
  };

  const onSubmit = async ({ description }: z.infer<typeof DescriptionSchema>) => {
    if (description === todo.description) {
      return;
    }

    setIsSubmitting(true);
    const { id } = todo;
    const details: Pick<Todo, 'id' | 'description'> = { id, description };

    try {
      const { error, data } = await updateTodoDetails(details);

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Failed to update description',
          description: 'There was an error while updating the description. Please try again later',
        });
        return;
      }
      toast({
        title: 'Description updated successfully',
        description: 'The new description has been updated successfully!',
      });
      handleTodoUpdate(data);
      removeDraftDescriptionFromStorage();
      setHasDraftDescription(false);
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
    <div className="flex w-full items-start gap-x-3">
      <AlignLeft className="mt-0.5 h-5 w-5 text-neutral-700" />
      <div className="w-full">
        <div className="mb-2 flex items-center justify-between">
          <p className="font-semibold text-neutral-700">Description</p>
          {hasDraftDescription && (
            <Badge variant="secondary" className="rounded-sm">
              {' '}
              Unsaved Changes
            </Badge>
          )}
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
                      <Textarea disabled={isSubmitting} placeholder="Add a more details description..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isSubmitting}
                type="submit"
                className="w-1/10 h-8 rounded-md bg-indigo-600 disabled:cursor-not-allowed">
                Submit
              </Button>
              {hasDraftDescription ? (
                <Button
                  disabled={isSubmitting}
                  type="button"
                  variant="secondary"
                  className="w-1/10 mx-4 h-8 rounded-md"
                  onClick={discardDescriptionChanges}>
                  Discard Changes
                </Button>
              ) : (
                <Button
                  disabled={isSubmitting}
                  type="button"
                  variant="secondary"
                  className="w-1/10 mx-4 h-8 rounded-md"
                  onClick={disableEditing}>
                  Close
                </Button>
              )}
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
