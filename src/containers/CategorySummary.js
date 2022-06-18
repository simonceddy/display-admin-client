import { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { useNavigate } from 'react-router-dom';
import { MEDIA_BASE_URI } from '../support/consts';
import StdButton from '../components/Interactive/StdButton';

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
          <div className="my-1 bg-green-500 bg-opacity-25 flex flex-col justify-start items-start">
            <span>
              {totalItems} item{totalItems === 1 ? null : 's'} in category
            </span>
            {totalItems > 0 ? (
              <div className="flex flex-row justify-start items-center rounded p-2">
                {category.items.map((i) => {
                  if (!i.thumbnail) return null;
                  return (
                    <>
                      <img
                        data-tip={i.title}
                        key={`${category.key}-summary-${i.key}-thumbnail`}
                        className="mx-1 rounded p-1"
                        height="auto"
                        width={60}
                        src={`${MEDIA_BASE_URI}thumbs/${i.thumbnail.src}`}
                        alt={i.thumbnail.alt}
                      />
                      <ReactTooltip />
                    </>
                  );
                })}
              </div>
            ) : null}
          </div>
          <div className="my-1 bg-green-500 bg-opacity-25">
            {totalSubs} sub-categor{totalSubs === 1 ? 'y' : 'ies'} in category
            {totalSubItems ? ` containing ${totalSubItems} total item${totalSubItems === 1 ? null : 's'}` : null}
          </div>
          <div>
            <StdButton onClick={() => navigate(`/category/${category.key}`)}>Edit</StdButton>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default CategorySummary;
