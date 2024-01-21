import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlignLeft, Blocks, Check, Pencil, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { ZodType } from 'zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const schema: ZodType<any> = z.object({
  category: z.string(),
});
const CategorySelect = ({ todo }: any) => {
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
    <div className="flex items-center gap-x-3 w-full h-7 mb-2">
      <Blocks className="h-5 w-5 text-neutral-700" />
      <div  className="grid grid-cols-8 gap-6 w-full h-full items-center">
        <div className="col-span-2">
          <p className="font-semibold text-neutral-700 tx-md">
            Category
          </p>
        </div>
        <div className="col-span-6 items-center">
          <div className="font-normal text-sm hover:bg-gray-100 hover:py-0.5">
            {'Second Category'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategorySelect
