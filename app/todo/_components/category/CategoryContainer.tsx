import CategoryForm from '@/app/todo/_components/category/CategoryForm';

const CategoryContainer = () => {
  return (
    <ol className="flex h-full gap-x-3">
      <CategoryForm />
    </ol>
  );
};

export default CategoryContainer;
