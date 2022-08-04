import StdButton from '../Interactive/StdButton';

function SubCategoryList({ subs = [] }) {
  return (
    <div className="w-full flex flex-col justify-start items-start">
      {subs.map((c) => {
        const totalItems = c.items ? c.items.length : 0;
        return (
          <div
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
          </div>
        );
      })}
    </div>
  );
}

export default SubCategoryList;
