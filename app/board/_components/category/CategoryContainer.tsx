import CategoryForm from '../../_components/category/CategoryForm';
import CategoryItem from '../../_components/category/CategoryItem';
import { getCategories } from '@/app/board/_actions/category.actions';

const CategoryContainer = ({ categories }: any) => {
  return (
    <ol className="flex h-full gap-x-3">
      {categories.map((category: any) => {
        return <CategoryItem key={category.id} category={category} />;
      })}
      <CategoryForm />
      <div className="w-1 flex-shrink-0" />
    </ol>
  );
};

export default CategoryContainer;
