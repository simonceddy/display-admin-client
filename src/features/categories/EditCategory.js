/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ThumbnailRow from '../../components/Category/ThumbnailRow';
import CategoryForm from '../../components/Forms/CategoryForm';
import DebouncedButton from '../../components/Interactive/DebouncedButton';
import StdButton from '../../components/Interactive/StdButton';
import {
  useArchiveCategoryMutation,
  useFetchCategoryQuery,
  useFetchDataQuery,
  useUnarchiveCategoryMutation,
  useUpdateArticleMutation
} from '../../services/api';
import CreateItem from '../items/CreateItem';
import CreateSubCategory from './CreateSubCategory';
import {
  addItem, setFormValues, addAllItems, addAllSubs, initItems
} from './categoryFormSlice';

function archiveButtonLabel({ isWorking, archived }) {
  if (isWorking) return 'Working...';
  return archived ? 'Unarchive' : 'Archive';
}

function EditCategory() {
  const { key } = useParams();
  const {
    data, isLoading, error, isSuccess, refetch
  } = useFetchCategoryQuery(key);
  const { refetch: refetchDataList } = useFetchDataQuery();
  const [updateData, { isSuccess: updated }] = useUpdateArticleMutation();
  const dispatch = useDispatch();
  const {
    values,
    items,
    subCategories
  } = useSelector((state) => (state.categoryForm));
  const [archiveCategory, {
    isLoading: archiving
  }] = useArchiveCategoryMutation();
  const [unarchiveCategory, {
    isLoading: unarchiving
  }] = useUnarchiveCategoryMutation();

  const [showItemForm, setShowItemForm] = useState(false);
  const [showSubForm, setShowSubForm] = useState(false);

  const refetchAll = () => {
    refetch();
    refetchDataList();
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(setFormValues({ title: data.title || '' }));
      dispatch(initItems(data.items || []));
      // if (data.categories.length > 0) dispatch(addAllSubs(data.subCategories));
    }
  }, [isSuccess]);

  if (isLoading) return <div>Loading Data</div>;
  if (error) return <div>{error.message}</div>;

  // console.log(values);
  return (
    <CategoryForm
      onSubmit={async () => {
        // console.log(values);
        await updateData({ key, ...values }).unwrap();
        refetchAll();
        console.log('updated');
      }}
      values={values}
      setValues={(vals) => dispatch(setFormValues(vals))}
    >
      {updated ? <div>Category updated</div> : null}
      {/* items and subcategories */}
      <div className="border-2 rounded-md border-slate-400 my-2 w-full">
        {/* TODO bring up item form inline or as modal */}
        items
        {showItemForm ? (
          <CreateItem
            onClose={() => setShowItemForm(false)}
            onSubmit={(item) => {
              // console.log(item);
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
      <div>
        <DebouncedButton
          wait={300}
          disabled={archiving || unarchiving}
          onClick={async () => {
            if (data.archived) {
              await unarchiveCategory(key).unwrap();
            } else {
              await archiveCategory(key).unwrap();
            }
            refetchAll();
          }}
        >
          {archiveButtonLabel({
            isWorking: archiving || unarchiving,
            archived: data.archived
          })}
        </DebouncedButton>
      </div>
    </CategoryForm>
  );
}

export default EditCategory;
