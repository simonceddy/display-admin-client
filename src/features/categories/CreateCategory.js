import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThumbnailRow from '../../components/Category/ThumbnailRow';
import CategoryForm from '../../components/Forms/CategoryForm';
import StdButton from '../../components/Interactive/StdButton';
import { useFetchDataQuery, useSaveNewCategoryMutation } from '../../services/api';
import EditUnsavedItem from '../items/EditUnsavedItem';
import NewItem from '../items/NewItem';
import {
  addItem, setFormValues, initForm, setThumbnail, removeItem, setItems
} from './categoryFormSlice';
import CreateSubCategory from './CreateSubCategory';

function CreateCategory() {
  const { refetch } = useFetchDataQuery();
  const [createCategory, { isSuccess }] = useSaveNewCategoryMutation();
  const { values, items, thumbnail } = useSelector((state) => state.categoryForm);
  const dispatch = useDispatch();

  const [showItemForm, setShowItemForm] = useState(false);
  const [showSubForm, setShowSubForm] = useState(false);
  const [editingItem, setEditingItem] = useState(false);

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    let isInit = false;
    if (!initialized && !isInit) {
      dispatch(initForm());
      setInitialized(true);
    }
    return () => {
      isInit = true;
    };
  }, [initialized]);

  return (
    <div className="flex flex-col justify-start items-center w-full p-2">
      <h2 className="mx-2 mt-2 mb-4 text-xl font-bold p-1 border-b-2 border-slate-500">
        Create a new Category
      </h2>
      {isSuccess ? <div>Category created</div> : null}
      <CategoryForm
        values={values}
        setValues={(vals) => dispatch(setFormValues(vals))}
        onSubmit={async () => {
          console.log(values);
          await createCategory({ ...values, items, thumbnail }).unwrap();
          refetch();
        }}
      >
        {/* items and subcategories */}
        <div className="border-2 rounded-md border-slate-400 my-2 w-full">
          {/* TODO bring up item form inline or as modal */}
          {showItemForm ? (
            <NewItem
              onClose={() => setShowItemForm(false)}
              onSubmit={(item) => {
                console.log(item);
                dispatch(addItem(item));
                if ((!thumbnail || !thumbnail.src)
                  && item.thumbnail
                  && item.thumbnail.src
                ) {
                  dispatch(setThumbnail({ src: item.thumbnail.src }));
                }
                setShowItemForm(false);
              }}
            />
          ) : (
            <StdButton
              onClick={() => setShowItemForm(true)}
            >
              Add Item
            </StdButton>
          )}
          <div className="p-2">
            {items.length} items in category
          </div>
          <ThumbnailRow
            items={items}
            onItemClick={(i) => {
              setEditingItem(i);
              console.log(i);
            }}
          />
          {editingItem && (
            <EditUnsavedItem
              setCategoryThumb={(src) => dispatch(setThumbnail({ src }))}
              data={editingItem}
              onClose={() => setEditingItem(false)}
              onDelete={() => {
                dispatch(removeItem(editingItem));
                setEditingItem(false);
              }}
              onUpdate={(i) => {
                dispatch(setItems(items.map((a) => {
                  if (a === editingItem) {
                    return i;
                  }
                  return a;
                })));
                setEditingItem(false);
              }}
            />
          )}
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
