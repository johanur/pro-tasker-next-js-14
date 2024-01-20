interface Props {
  category: any;
  index: number;
}
const CategoryItem = ({ category, index }: Props) => {
  return (
    <li className="h-full w-[272px] shrink-0 select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] pb-2 shadow-md">
        <div className="items-start- flex justify-between gap-x-2 px-2 pt-2 text-sm font-semibold">
          <div className="h-7 w-full border-transparent px-2.5 py-1 text-sm font-medium">{category.title}</div>
        </div>

        <div className="px-2 pt-2">
          <button className="flex h-auto w-full justify-start px-2 py-1.5 text-sm text-slate-500">+ Add a card</button>
        </div>
      </div>
    </li>
  );
};

export default CategoryItem;
