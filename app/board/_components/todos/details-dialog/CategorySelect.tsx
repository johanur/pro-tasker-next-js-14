import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { Blocks, Check, Pencil, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BoardContext } from '@/app/board/_contexts';
import { Todo, TodoDetailsComponentsProps } from '@/app/board/_types';
import { createActivityLog, updateTodoDetails } from '@/app/board/_actions';
import { toast } from '@/components/ui/use-toast';
import { CategorySelectSchema } from '@/app/board/_schema';

const CategorySelect = ({ todo, handleTodoUpdate }: TodoDetailsComponentsProps) => {
  const { categories } = useContext(BoardContext);

  const [isEditing, setIsEditing] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const categoryDetails = categories.find(category => category.id === todo.category_id);
    if (!categoryDetails) {
      return;
    }

    setCategoryTitle(categoryDetails.title);
  }, [todo]);

  const form = useForm<z.infer<typeof CategorySelectSchema>>({
    resolver: zodResolver(CategorySelectSchema),
  });

  const enableEditing = () => {
    setIsEditing(true);
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onSubmit = async ({ category: categoryId }: z.infer<typeof CategorySelectSchema>) => {
    if (categoryId === todo.category_id) {
      return;
    }

    setIsSubmitting(true);

    const details: Pick<Todo, 'id' | 'category_id'> = {
      id: todo.id,
      category_id: categoryId,
    };

    const category = categories.find(category => category.id === categoryId);

    try {
      const { error, data } = await updateTodoDetails(details);
      if (category) {
        await createActivityLog(todo.id, category.title);
      }

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Failed to update category',
          description: 'There was an error while updating the category. Please try again later',
        });
        return;
      }

      toast({
        title: 'Category updated successfully',
        description: 'The new category has been updated successfully!',
      });
      handleTodoUpdate(data);
      disableEditing();
    } catch {
      toast({
        variant: 'destructive',
        title: 'Something Went Wrong!',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-2 flex h-10 w-full items-center gap-x-3">
      <Blocks className="h-5 w-5 text-neutral-700" />
      <div className="grid h-full w-full grid-cols-8 items-center gap-6">
        <div className="col-span-2">
          <p className="tx-md font-semibold text-neutral-700">Category</p>
        </div>
        <div className="col-span-6 items-center">
          {isEditing ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <div className="flex w-full flex-1 items-center gap-2">
                  <div className="flex-grow">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            disabled={isSubmitting}
                            onValueChange={field.onChange}
                            defaultValue={todo.category_id}>
                            <FormControl>
                              <SelectTrigger className="focus:ring-0 focus:ring-offset-0">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map(category => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button disabled={isSubmitting} type="submit" className="bg-transparent p-0 hover:bg-transparent">
                    <Check className="text-black" size={20} />
                  </Button>
                  <Button
                    disabled={isSubmitting}
                    className="bg-transparent p-0 hover:bg-transparent"
                    onClick={disableEditing}>
                    <X className="text-black" size={20} />
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <div role="button" onClick={enableEditing} className="text-sm font-normal hover:bg-gray-100 hover:py-0.5">
              {categoryTitle}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategorySelect;
