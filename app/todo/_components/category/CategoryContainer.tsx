import CategoryForm from '../../_components/category/CategoryForm';
import CategoryItem from '../../_components/category/CategoryItem';

const CategoryContainer = () => {
  const categories: any[] = [
    {
      id: 123,
      title: 'First Category',
      order: 1,
    },
    {
      id: 234,
      title: 'Second Category',
      order: 2,
    },
    {
      id: 456,
      title: 'Third Category',
      order: 3,
    },
  ];
  return (
    <ol className="flex h-full gap-x-3">
      {categories.map((category, index) => {
        return <CategoryItem key={category.id} index={index} category={category} />;
      })}
      <CategoryForm />
      <div className="w-1 flex-shrink-0" />
    </ol>
  );
};

export default CategoryContainer;
