/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import ThumbnailRow from '../../components/Category/ThumbnailRow';
import CategoryForm from '../../components/Forms/CategoryForm';
import DebouncedButton from '../../components/Interactive/DebouncedButton';
import StdButton from '../../components/Interactive/StdButton';
import {
  useAddItemToCategoryMutation,
  useArchiveCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoryQuery,
  useFetchDataQuery,
  usePublishCategoryMutation,
  useUnarchiveCategoryMutation,
  useUnpublishCategoryMutation,
  useUpdateArticleMutation
} from '../../services/api';
// import CreateItem from '../items/CreateItem';
import CreateSubCategory from './CreateSubCategory';
import {
  addItem, setFormValues, initForm, setThumbnail
} from './categoryFormSlice';
import NewItem from '../items/NewItem';
import UpdateItem from '../items/UpdateItem';
import { addNotification } from '../notifications/notificationsSlice';
import { MEDIA_BASE_URI } from '../../support/consts';

function archiveButtonLabel({ isWorking, archived }) {
  if (isWorking) return 'Working...';
  return archived ? 'Unarchive' : 'Archive';
}

function publisheButtonLabel({ isWorking, published }) {
  if (isWorking) return 'Working...';
  return published ? 'Unpublish' : 'Publish';
}

const thumbsrc = (src) => (src.endsWith('.png') || src.endsWith('.jpg')
  ? src : `${src}.png`);

function EditCategory() {
  const { key } = useParams();
  const [editingItem, setEditingItem] = useState(null);
  const navigate = useNavigate();
  const {
    data, isLoading, error, isSuccess, refetch
  } = useFetchCategoryQuery(key);
  const { refetch: refetchDataList } = useFetchDataQuery();
  const [updateData, { isSuccess: updated }] = useUpdateArticleMutation();
  const dispatch = useDispatch();
  const {
    values,
    items,
    subCategories,
    thumbnail,
  } = useSelector((state) => (state.categoryForm));
  const [archiveCategory, {
    isLoading: archiving
  }] = useArchiveCategoryMutation();
  const [unarchiveCategory, {
    isLoading: unarchiving
  }] = useUnarchiveCategoryMutation();
  const [publishCategory, {
    isLoading: publishing
  }] = usePublishCategoryMutation();
  const [unpublishCategory, {
    isLoading: unpublishing
  }] = useUnpublishCategoryMutation();

  const [deleteCategory, { isSuccess: deleted }] = useDeleteCategoryMutation();
  const [addItemTo, { isSuccess: itemAdded }] = useAddItemToCategoryMutation();

  const [showItemForm, setShowItemForm] = useState(false);
  const [showSubForm, setShowSubForm] = useState(false);

  const refetchAll = () => {
    refetch();
    refetchDataList();
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(initForm({
        values: { ...values, ...data },
        items: data.items,
        categories: data.categories,
        thumbnail: data.thumbnail
      }));
    }
  }, [isSuccess]);

  const UpdateComponent = useCallback(() => (
    editingItem ? (
      <UpdateItem
        setCategoryThumb={(src) => {
          dispatch(setThumbnail({
            src
          }));
          refetchAll();
        }}
        itemKey={editingItem}
        category={key}
        onSetThumb={() => {
          refetchAll();
        }}
              // subCategory={sub}
        onSubmit={() => {
          refetchAll();
        }}
        onClose={() => setEditingItem(false)}
      />
    ) : ''
  ), [editingItem, updated]);

  // const ItemRow = useCallback(() => (
  //   <ThumbnailRow
  //     onItemClick={(i) => {
  //       // navigate(`/category/${key}/item/${i.key}`);
  //       // console.log('handle item edit');
  //       if (editingItem !== i.key) {
  //         setEditingItem(i.key);
  //       } else {
  //         setEditingItem(false);
  //       }
  //     }}
  //     categoryKey={key}
  //     items={items}
  //   />
  // ), [items, data, updated]);

  if (isLoading) return <div>Loading Data</div>;
  if (error) return <div>{error.message}</div>;

  if (deleted) {
    return (
      <div>
        Category deleted
        <StdButton onClick={() => navigate('/')}>
          Done
        </StdButton>
      </div>
    );
  }
  // console.log(thumbnail, data.thumbnail);
  return (
    <CategoryForm
      onSubmit={async () => {
        await updateData({
          key, ...values, thumbnail, items, categories: subCategories
        }).unwrap();
        refetchAll();
        console.log('updated');
      }}
      values={values}
      setValues={(vals) => dispatch(setFormValues(vals))}
    >
      {itemAdded && <div>New item added</div>}
      {updated && <div>Category updated</div>}
      {/* items and subcategories */}
      {thumbnail && thumbnail.src && (
        <img
          id={`${key}-thumbnail`}
          className="rounded p-0.5"
          height="auto"
          width={70}
          src={`${MEDIA_BASE_URI}thumbs/${thumbsrc(thumbnail.src)}`}
          alt={thumbnail.alt || values.title}
        />
      )}
      <div className="border-2 rounded-md border-slate-400 my-2 w-full">
        {/* TODO bring up item form inline or as modal */}
        {showItemForm ? (
          <NewItem
            onClose={() => setShowItemForm(false)}
            onSubmit={async (item) => {
              console.log(item);
              const res = await addItemTo(item).unwrap();
              if (res.key) {
                dispatch(addItem(item));
                refetchAll();
                if ((!thumbnail || !thumbnail.src)
                  && item.thumbnail
                  && item.thumbnail.src
                ) {
                  dispatch(setThumbnail({ src: item.thumbnail.src }));
                }
                setShowItemForm(false);
              } else {
                console.log(res);
                dispatch(addNotification(
                  'There was an error adding the new item to category'
                ));
              }
            }}
          />
        ) : (
          <StdButton
            onClick={() => setShowItemForm(true)}
          >
            Add Item
          </StdButton>
        )}
        {/* <ItemRow /> */}
        <ThumbnailRow
          onItemClick={(i) => {
            // navigate(`/category/${key}/item/${i.key}`);
            // console.log('handle item edit');
            if (editingItem !== i.key) {
              setEditingItem(i.key);
            } else {
              setEditingItem(false);
            }
          }}
          categoryKey={key}
          items={items}
        />
        {editingItem && (
          <UpdateComponent />
        )}
      </div>
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
      <div className="flex flex-row p-2">
        <DebouncedButton
          wait={300}
          disabled={archiving || unarchiving}
          onClick={async () => {
            dispatch(setFormValues({ ...values, archived: !data.archived }));
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
        <DebouncedButton
          wait={300}
          disabled={publishing || unpublishing}
          onClick={async () => {
            dispatch(setFormValues({ ...values, published: !data.published }));
            if (data.published) {
              await unpublishCategory(key).unwrap();
            } else {
              await publishCategory(key).unwrap();
            }
            refetchAll();
          }}
        >
          {publisheButtonLabel({
            isWorking: publishing || unpublishing,
            published: data.published
          })}
        </DebouncedButton>
        <DebouncedButton
          wait={200}
          onClick={() => confirmAlert({
            buttons: [
              {
                label: 'Delete Category!',
                onClick: async () => {
                  await deleteCategory(key).unwrap();
                  refetchDataList();
                }
              },
              {
                label: 'Cancel!',
                onClick: () => console.log('cancelled')
              }
            ],
            title: `Confirm delete Category: ${values.title || ''}`,
            message: 'This action cannot be undone!'
          })}
        >
          Delete
        </DebouncedButton>
      </div>
    </CategoryForm>
  );
}

export default EditCategory;
