'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog';
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

import * as z from "zod"
import { cn } from '@/lib/utils';
import { addDays, format, isBefore } from 'date-fns';
import { TodoSchema } from '@/app/board/_schema/todo.schema';
import { useState } from 'react';
import { addCategory, addTodo } from '@/app/board/_actions/board.actions';
import { toast } from '@/components/ui/use-toast';

const TodoCreate = ({ isOpen, onToggle, categoryId }: any) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const oneDayBefore = addDays(new Date(), -1);

  const form = useForm<z.infer<typeof TodoSchema>>({
    resolver: zodResolver(TodoSchema),
  })

  const onSubmit = async(values: z.infer<typeof TodoSchema>) => {
    const data = {
      ...values,
      categoryId
    }

    const result = await addTodo(data);
    const { error } = JSON.parse(result);
    console.log('Log Here Result: ', result);

    if (error?.message) {
      toast({
        duration: 4000,
        variant: "destructive",
        title: "Failed to create todo",
        description: "There was an error while saving the new todo. Please try again later.",
      })
    } else {
      toast({
        duration: 4000,
        title: "Todo Added Successfully",
        description: "The new todo has been added successfully!",
      })
      handleCloseDialog();
    }
  }
  const handleCloseDialog = () => {
    form.reset();
    onToggle(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleCloseDialog}>

        <DialogContent>
          <DialogHeader className="mb-5">
            <DialogTitle>Add Todo</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter a title..." {...field} />
                      </FormControl>
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
                        <Textarea placeholder="Add a more details description..." {...field} />
                      </FormControl>
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
                              variant={"outline"}
                              className={cn(
                                "pl-3 flex justify-start font-normal w-full",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <div className="flex m-1">
                            <div className="flex-1"></div>
                            </div>

                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(e) => { field.onChange(e); setIsCalendarOpen(false); } }
                            disabled={(date) => isBefore(date, oneDayBefore)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                )}
              />
              <Button type="submit" className="bg-indigo-600 h-8 rounded-sm w-1/5">Submit</Button>
              <Button type="button" variant="secondary" className="mx-4 h-8 rounded-sm w-1/5" onClick={handleCloseDialog}>Close</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TodoCreate;
