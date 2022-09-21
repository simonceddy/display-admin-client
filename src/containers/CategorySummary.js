import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StdButton from '../components/Interactive/StdButton';
import ThumbnailRow from '../components/Category/ThumbnailRow';
import SubCategoryList from '../components/Category/SubCategoryList';
import DebouncedButton from '../components/Interactive/DebouncedButton';
import VertArrowToggle from '../components/Interactive/VertArrowToggle';
import thumbsrc from '../util/thumbsrc';
import { MEDIA_BASE_URI } from '../support/consts';

function countSubCategoryItems(subs = []) {
  let totalItems = 0;

  subs.map((s) => {
    if (s.items) totalItems += s.items.length;
    return s;
  });

  return totalItems;
}

function CategorySummary({ category = {}, handleArchive, handlePublish }) {
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
        <span className="hover:underline flex flex-row justify-start items-center">
          <span className="mr-2">
            {category.published ? '' : 'Unpublished - '}{category.archived ? 'Archived - ' : ''}
          </span>
          <h3
            className="text-xl capitalize font-bold flex-1"
          >
            {category.title}
          </h3>
        </span>
        <VertArrowToggle toggled={showSummary} />
      </div>
      {showSummary && (
        <div
          className="flex flex-col justify-start items-start border-t-2 w-full border-blue-600 dark:border-blue-200 pt-3"
        >
          {category.thumbnail && category.thumbnail.src && (
          <img
            id={`${category.key}-thumbnail`}
            className="rounded p-0.5"
            height="auto"
            width={70}
            src={`${MEDIA_BASE_URI}thumbs/${thumbsrc(category.thumbnail.src)}`}
            alt={category.thumbnail.alt || category.title}
          />
          )}
          <div className="my-1 p-2 bg-green-500 bg-opacity-25 flex flex-col justify-start items-start w-full rounded">
            <span>
              {totalItems} item{totalItems === 1 ? '' : 's'} in category
            </span>
            {totalItems > 0 && (
              <ThumbnailRow items={category.items} categoryKey={category.key} />
            )}
          </div>
          <div className="my-1 p-2a flex flex-col justify-start items-start bg-green-500 bg-opacity-25 w-full p-2 rounded">
            <div
              role="presentation"
              onClick={() => { if (totalSubs) setShowSubs(!showSubs); }}
              className={`w-full flex flex-row ${totalSubs ? 'justify-between' : 'justify-start'} items-center`}
            >
              <span>
                {totalSubs} sub-categor{totalSubs === 1 ? 'y' : 'ies'} in category
                {totalSubItems ? ` containing ${totalSubItems} total item${totalSubItems === 1 ? '' : 's'}` : ''}
              </span>
              {totalSubs > 0 && (
                <VertArrowToggle toggled={showSubs} />
              )}
            </div>
            {totalSubs > 0 && showSubs && (
              <SubCategoryList category={category.key} subs={category.categories} />
            )}
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
                onClick={() => navigate(`/category/${category.key}/createSubCategory`)}
              >
                Add Sub-Category
              </StdButton>
            </div>
            <div>
              <DebouncedButton
                wait={300}
                onClick={handlePublish}
              >
                {category.published ? 'Unpublish' : 'Publish'}
              </DebouncedButton>
              <DebouncedButton
                wait={300}
                onClick={handleArchive}
              >
                {category.archived ? 'Unarchive' : 'Archive'}
              </DebouncedButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategorySummary;
