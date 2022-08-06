import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThumbnailRow from '../../components/Category/ThumbnailRow';
import CategoryForm from '../../components/Forms/CategoryForm';
import StdButton from '../../components/Interactive/StdButton';
import { useFetchDataQuery, useSaveNewCategoryMutation } from '../../services/api';
import { setCategoryValues } from '../../store/newCategorySlice';
import CreateItem from '../items/CreateItem';
import { addItem } from './createCategorySlice';
import CreateSubCategory from './CreateSubCategory';

function CreateCategory() {
  const { refetch } = useFetchDataQuery();
  const [createCategory] = useSaveNewCategoryMutation();
  const { values, items } = useSelector((state) => state.newCategory);
  const dispatch = useDispatch();

  const [showItemForm, setShowItemForm] = useState(false);
  const [showSubForm, setShowSubForm] = useState(false);

  return (
    <div className="flex flex-col justify-start items-center w-full p-2">
      <h2 className="mx-2 mt-2 mb-4 text-xl font-bold p-1 border-b-2 border-slate-500">
        Create a new Category
      </h2>
      <CategoryForm
        values={values}
        setValues={(vals) => dispatch(setCategoryValues(vals))}
        onSubmit={async () => {
          console.log(values);
          await createCategory(values).unwrap();
          refetch();
        }}
      >
        {/* items and subcategories */}
        <div className="border-2 rounded-md border-slate-400 my-2 w-full">
          {/* TODO bring up item form inline or as modal */}
          items
          {showItemForm ? (
            <CreateItem
              onClose={() => setShowItemForm(false)}
              onSubmit={(item) => {
                console.log(item);
                dispatch(addItem(item));
              }}
            />
          ) : (
            <StdButton
              onClick={() => setShowItemForm(true)}
            >
              Add Item
            </StdButton>
          )}
          <ThumbnailRow items={items} />
        </div>
        {/* item form - title, body, media */}
        {/* media */}

        {/* subcategories */}
        <div className="border-2 rounded-md border-slate-400 my-2 w-full">
          {/* {values.categories.length} total sub-categories */}
          {showSubForm ? (
            <CreateSubCategory onClose={() => setShowSubForm(false)} />
          ) : (
            <StdButton
              onClick={() => setShowSubForm(true)}
            >
              Add Sub-Category
            </StdButton>
          )}
        </div>
      </CategoryForm>
    </div>
  );
}

export default CreateCategory;
