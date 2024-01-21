import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Blocks, Check, Pencil, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
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

  });

  const disableEditing = () => {
    setIsEditing(false);
  };
  const enableEditing = () => {
    setIsEditing(true);
  }

  const onSubmit = (value: any) => {
    console.log('Log Here value: ', value);
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
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                  <div className="flex w-full flex-1 gap-2 items-center">
                    <div className="flex-grow">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) =>  (
                          <FormItem>
                            <Select onValueChange={field.onChange} defaultValue={todo.category_id}>
                              <FormControl>
                                <SelectTrigger className="focus:ring-0 focus:ring-offset-0">
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories.map(category => (
                                  <SelectItem key={category.id} value={category.id}>{category.title}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button type="submit" className="bg-transparent hover:bg-transparent p-0">
                      <Check className="text-black" size={20} />
                    </Button>
                    <Button className="bg-transparent hover:bg-transparent p-0" onClick={disableEditing}>
                      <X className="text-black" size={20} />
                    </Button>
                  </div>
                </form>
              </Form>

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
