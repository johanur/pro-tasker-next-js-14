'use client';

import { useContext, useState } from 'react';
import { addDays, format, isBefore } from 'date-fns';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { TodoSchema } from '@/app/board/_schema';
import { addTodo } from '@/app/board/_actions';
import { toast } from '@/components/ui/use-toast';
import { BoardContext } from '@/app/board/_contexts';
import { AddTodoSchema, TodoCreateProps, TodoFormData } from '@/app/board/_types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const TodoCreate = ({ isOpen, onToggle, categoryId }: TodoCreateProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { categories } = useContext(BoardContext);

  const oneDayBefore = addDays(new Date(), -1);

  const form = useForm<AddTodoSchema>({
    resolver: zodResolver(TodoSchema),
    defaultValues: {
      title: '',
      description: '',
      category: categoryId,
    },
  });

  const onChangeCategory = (categoryId: string) => {
    form.setValue('category', categoryId);
  };

  const handleCloseDialog = () => {
    if (isSubmitting) {
      return;
    }
    form.reset();
    onToggle(false);
  };

  const onSubmit = async (values: TodoFormData) => {
    toast({
      title: 'Creating todo...',
    });

    setIsSubmitting(true);

    try {
      const { error } = await addTodo(values);

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Failed to create todo',
          description: 'There was an error while saving the new todo. Please try again later',
        });
        return;
      }

      toast({
        title: 'Todo Added Successfully',
        description: 'The new todo has been added successfully!',
      });
      handleCloseDialog();
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
    <>
      <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
        <DialogContent onOpenAutoFocus={e => e.preventDefault()}>
          <DialogHeader className="mb-5">
            <DialogTitle>Add Todo</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select disabled={isSubmitting} onValueChange={onChangeCategory} defaultValue={categoryId}>
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
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input disabled={isSubmitting} placeholder="Enter a title..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea disabled={isSubmitting} placeholder="Add a more details description..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isSubmitting} type="submit" className="h-8 w-1/5 rounded-sm bg-indigo-600">
                Submit
              </Button>
              <Button
                disabled={isSubmitting}
                type="button"
                variant="secondary"
                className="mx-4 h-8 w-1/5 rounded-sm"
                onClick={handleCloseDialog}>
                Close
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TodoCreate;
