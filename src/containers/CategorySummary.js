import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StdButton from '../components/Interactive/StdButton';
import ThumbnailRow from '../components/Category/ThumbnailRow';
import SubCategoryList from '../components/Category/SubCategoryList';

function countSubCategoryItems(subs = []) {
  let totalItems = 0;

  subs.map((s) => {
    if (s.items) totalItems += s.items.length;
    return s;
  });

  return totalItems;
}

function CategorySummary({ category = {} }) {
  const navigate = useNavigate();
  const [showSummary, setShowSummary] = useState(false);
  const totalItems = category.items ? category.items.length : 0;
  const totalSubs = category.categories ? category.categories.length : 0;
  const [showSubs, setShowSubs] = useState(false);

  const totalSubItems = totalSubs > 0
    ? countSubCategoryItems(category.categories)
    : null;

  return (
    <div
      className="w-full flex flex-col justify-start items-start odd:bg-gray-100 dark:odd:bg-gray-800 even:bg-blue-100 dark:even:bg-blue-800 px-2 py-3 my-1 rounded"
    >
      <div
        onClick={() => setShowSummary(!showSummary)}
        role="presentation"
        className="w-full cursor-pointer flex flex-row justify-between items-center pb-2"
      >
        <h3
          className="hover:underline text-xl capitalize font-bold flex-1"
        >
          {category.title}
        </h3>
        <div className="text-lg pr-3">{showSummary ? '△' : '▽'}</div>
      </div>
      {showSummary ? (
        <div
          className="flex flex-col justify-start items-start border-t-2 w-full border-blue-600 dark:border-blue-200 pt-3"
        >
          <div className="my-1 p-2 bg-green-500 bg-opacity-25 flex flex-col justify-start items-start w-full rounded">
            <span>
              {totalItems} item{totalItems === 1 ? null : 's'} in category
            </span>
            {totalItems > 0 ? (
              <ThumbnailRow items={category.items} categoryKey={category.key} />
            ) : null}
          </div>
          <div className="my-1 p-2a flex flex-col justify-start items-start bg-green-500 bg-opacity-25 w-full p-2 rounded">
            <div
              role="presentation"
              onClick={() => { if (totalSubItems) setShowSubs(!showSubs); }}
              className={`w-full flex flex-row ${totalSubItems ? 'justify-between' : 'justify-start'} items-center`}
            >
              <span>
                {totalSubs} sub-categor{totalSubs === 1 ? 'y' : 'ies'} in category
                {totalSubItems ? ` containing ${totalSubItems} total item${totalSubItems === 1 ? null : 's'}` : null}
              </span>
              {totalSubItems ? (
                <div className="text-lg pr-3">{showSubs ? '△' : '▽'}</div>
              ) : null}
            </div>
            {totalSubItems && showSubs ? (
              <SubCategoryList subs={category.categories} />
            ) : null}
          </div>
          <div className="flex flex-row justify-between items-center w-full">
            <div>
              <StdButton
                onClick={() => navigate(`/category/${category.key}`)}
              >
                Edit
              </StdButton>
              <StdButton
                onClick={() => navigate(`/category/${category.key}/createItem`)}
              >
                Add Item
              </StdButton>
              <StdButton
                onClick={() => console.log('add sub-category')}
              >
                Add Sub-Category
              </StdButton>
            </div>
            <div>
              <StdButton
                onClick={() => console.log('hide category')}
              >
                {category.archived ? 'Unarchive' : 'Archive'}
              </StdButton>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default CategorySummary;
