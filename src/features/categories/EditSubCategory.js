/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import SubCategoryForm from '../../components/Forms/SubCategoryForm';
import {
  addItem, initForm, setItems, setSubValues, setThumbnail
} from './subCategoryFormSlice';
import StdButton from '../../components/Interactive/StdButton';
import ThumbnailRow from '../../components/Category/ThumbnailRow';
import {
  useFetchCategoryQuery,
  useFetchDataQuery,
  useFetchSubCategoryQuery,
  useUpdateSubCategoryMutation,
  useRemoveSubCategoryFromCategoryMutation
} from '../../services/api';
import NewItem from '../items/NewItem';
import UpdateItem from '../items/UpdateItem';
import { MEDIA_BASE_URI } from '../../support/consts';
import thumbsrc from '../../util/thumbsrc';
import { addNotification } from '../notifications/notificationsSlice';

function EditSubCategory({ onClose, category, subCategory }) {
  const { key, sub } = useParams();
  // console.log(key, sub);
  const {
    data, isSuccess: fetched, isLoading: fetching, error, refetch: refresh
  } = useFetchSubCategoryQuery({
    key: key || category,
    sub: sub || subCategory,
  });
  const navigate = useNavigate();
  const { values, items, thumbnail } = useSelector((state) => state.subCategoryForm);
  const dispatch = useDispatch();
  const [showNewItemForm, setShowNewItemForm] = useState(false);
  const [editingItem, setEditingItem] = useState(false);
  const { refetch } = useFetchCategoryQuery(key);
  const { refetch: refetchDataList } = useFetchDataQuery();
  const [initialized, setInitialized] = useState(false);
  const [updateSub, { isSuccess: isUpdated }] = useUpdateSubCategoryMutation();
  const [removeSub, { isSuccess: isRemoved }] = useRemoveSubCategoryFromCategoryMutation();

  useEffect(() => {
    let isInit = false;
    if (fetched && !initialized && !isInit) {
      dispatch(initForm({
        values: { ...values, ...data },
        items: data.items,
        thumbnail: data.thumbnail
      }));
      setInitialized(true);
    }
    return () => {
      isInit = true;
    };
  }, [initialized, fetched]);

  const refetchAll = () => {
    refresh();
    refetch();
    refetchDataList();
  };

  // console.log(items);

  const doUpdate = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    console.log(key, sub);
    const updatedData = {
      title: values.title,
      thumbnail,
      key: key || category,
      sub: sub || subCategory,
    };
    console.log(updatedData);
    const res = await updateSub(updatedData).unwrap();
    console.log(res);
    setTimeout(refetchAll, 200);
  };

  useEffect(() => {
    if (isUpdated) {
      dispatch(addNotification({ message: `Sub category ${data.title} updated!` }));
    }
  }, [isUpdated]);

  useEffect(() => {
    if (isRemoved) {
      dispatch(addNotification({ message: `Sub category ${data.title} deleted` }));
    }
  }, [isRemoved]);

  const UpdateComponent = useCallback(() => (
    editingItem ? (
      <UpdateItem
        onDelete={async (d) => {
          // console.log(d);
          setEditingItem(null);
          await Promise.resolve(
            dispatch(setItems(items.filter((i) => i.title !== d.title)))
          );
          await doUpdate();
        }}
        setCategoryThumb={(src) => dispatch(setThumbnail({ src }))}
        itemKey={editingItem}
        category={key || category}
        subCategory={sub || subCategory}
        // onSubmit={() => {
        //   setTimeout(() => refetchAll(), 400);
        // }}
        onClose={() => setEditingItem(false)}
      />
    ) : ''
  ), [editingItem, isUpdated]);

  // const ItemsRow = useCallback(() => (
  //   <ThumbnailRow
  //     items={items}
  //     onItemClick={(i) => {
  //       // console.log(i);
  //       setEditingItem(i.key);
  //     }}
  //   />
  // ), [items]);

  if (fetching) return <div>Loading Data</div>;
  if (error) return <div>{error.message}</div>;
  // console.log(items);
  return (
    <div className="w-11/12">
      {isUpdated ? (
        <div>
          <div>Sub-Category updated</div>
          <StdButton className="m-2" onClick={() => navigate('/')}>
            Done
          </StdButton>
        </div>
      ) : null}
      {isRemoved ? (
        <div>
          <div>Sub-Category Removed</div>
          <StdButton className="m-2" onClick={() => navigate('/')}>
            Done
          </StdButton>
        </div>
      ) : (
        <>
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
          <SubCategoryForm
            onSubmit={doUpdate}
            items={items}
            values={values}
            onClose={() => {
              if (onClose) {
                onClose();
              } else {
                navigate('/');
              }
            }}
            setValues={(vals) => dispatch(setSubValues(vals))}
          >
            <div className="w-5/6">
              {showNewItemForm ? (
                <NewItem
                  subCategory={sub || subCategory}
                  category={key || category}
                  onClose={() => setShowNewItemForm(false)}
                  onCreated={() => {
                    setTimeout(() => refetchAll(), 400);
                  }}
                  // onSubmit={async ({
                  //   title, media, thumbnail: tb, body
                  // }) => {
                  //   // console.log(item);
                  //   await Promise.resolve(dispatch(addItem({
                  //     title,
                  //     thumbnail: tb,
                  //     media,
                  //     body
                  //   })))
                  //     .then(doUpdate)
                  //     .then(() => {
                  //       setShowNewItemForm(false);
                  //     });
                  //   if ((!thumbnail || !thumbnail.src) && tb && tb.src) {
                  //     dispatch(setThumbnail({ src: tb.src }));
                  //   }
                  // }}
                />
              ) : (
                <StdButton
                  onClick={() => setShowNewItemForm(true)}
                >
                  Add Item
                </StdButton>
              )}
              {/* <ItemsRow /> */}
              <div className="p-2">
                {items.length} items in category
              </div>
              <ThumbnailRow
                items={items}
                onItemClick={(i) => {
                  // console.log(i);
                  if (editingItem !== i.key) {
                    setEditingItem(i.key);
                  } else {
                    setEditingItem(false);
                  }
                }}
              />
              {editingItem && (
                <UpdateComponent />
              )}
            </div>
          </SubCategoryForm>
          <StdButton onClick={() => confirmAlert({
            buttons: [
              {
                label: 'Delete Sub-Category!',
                onClick: async () => {
                  await removeSub({ key, sub }).unwrap();
                  refetchAll();
                }
              },
              {
                label: 'Cancel!',
                onClick: () => console.log('cancelled')
              }
            ],
            title: `Confirm delete Sub-Category: ${values.title || ''}`,
            message: 'This action cannot be undone!'
          })}
          >
            Delete Sub-Category
          </StdButton>
        </>
      )}
    </div>
  );
}

export default EditSubCategory;
