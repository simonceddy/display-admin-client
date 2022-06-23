import StdButton from '../Interactive/StdButton';

function SubCategoryList({ subs = [] }) {
  return (
    <ul className="w-full">
      {subs.map((c) => {
        const totalItems = c.items ? c.items.length : 0;
        return (
          <li
            key={`subcategory-${c.key}-listing`}
            className="my-1 flex flex-row justify-between w-full items-center"
          >
            <span className="hover:underline font-bold text-lg mr-2">
              {c.title}
            </span>
            <span>{totalItems} item{totalItems === 1 ? null : 's'}</span>
            <StdButton onClick={() => console.log('edit sub')}>
              Edit Sub-Category
            </StdButton>
          </li>
        );
      })}
    </ul>
  );
}

export default SubCategoryList;
