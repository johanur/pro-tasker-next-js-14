import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlignLeft, Blocks, Check, Pencil, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { ZodType } from 'zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BoardContext } from '@/app/board/_contexts';

const schema: ZodType<any> = z.object({
  category: z.string(),
});
const CategorySelect = ({ todo, categoryTitle }: any) => {
  const {  categories } = useContext(BoardContext);

  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      category: 'm@example.com',
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
    <div className="flex items-center gap-x-3 w-full h-10 mb-2">
      <Blocks className="h-5 w-5 text-neutral-700" />
      <div  className="grid grid-cols-8 gap-6 w-full h-full items-center">
        <div className="col-span-2">
          <p className="font-semibold text-neutral-700 tx-md">
            Category
          </p>
        </div>
        <div className="col-span-6 items-center">
          {isEditing ? (
            <div className="flex w-full flex-1 gap-2 items-center">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="focus:ring-0 focus:ring-offset-0">
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="m@example.com">m@example.com</SelectItem>
                            <SelectItem value="m@google.com">m@google.com</SelectItem>
                            <SelectItem value="m@support.com">m@support.com</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
              <Button className="bg-transparent hover:bg-transparent p-0">
                <Check className="flex-grow-0 text-black" size={20} />
              </Button>
              <Button className="bg-transparent hover:bg-transparent p-0" onClick={disableEditing}>
                <X className="flex-grow-0 text-black" size={20} />
              </Button>
            </div>
          ) : (
            <div role="button" onClick={enableEditing} className="font-normal text-sm hover:bg-gray-100 hover:py-0.5">
              {categoryTitle}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default CategorySelect
