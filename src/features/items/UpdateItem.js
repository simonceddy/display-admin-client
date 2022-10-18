/* eslint-disable no-unused-vars */
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useCallback, useEffect, useState } from 'react';
import StdButton from '../../components/Interactive/StdButton';
import {
  useFetchCategoryQuery,
  useFetchDataQuery,
  useFetchItemQuery,
  useRemoveItemFromCategoryMutation,
  useUpdateItemMutation
} from '../../services/api';
import getUrl from '../../util/getUrl';
import ItemForm from './ItemForm';
import Modal from '../../components/Modal';
import ItemMedia from '../media/ItemMedia';
import uploadThumbnails from '../../util/uploads/uploadThumbnail';
import ChangeCategory from './ChangeCategory';
import { addNotification } from '../notifications/notificationsSlice';
import { NOTIFY_INFO } from '../notifications/support';
import ChangeSubCategory from './ChangeSubCategory';

function UpdateItem({
  category,
  subCategory,
  onClose,
  onSubmit,
  itemKey,
  children,
  setCategoryThumb,
  onDelete,
  update,
  onSetThumb
}) {
  const { key, sub, item } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { refetch } = useFetchCategoryQuery(key || category);
  const { refetch: refetchDataList } = useFetchDataQuery();

  const {
    data, isLoading, error, isSuccess: dataLoaded, refetch: refresh
  } = useFetchItemQuery({
    key: key || category,
    sub: sub || subCategory,
    item: item || itemKey
  });

  const refetchAll = () => {
    refresh();
    refetch();
    refetchDataList();
  };
  const [showMedia, setShowMedia] = useState(false);
  const [updatingItemCategories, setUpdatingItemCategories] = useState(false);
  const [updatedCategory, setUpdatedCategory] = useState(null);
  const [updatedSubCategory, setUpdatedSubCategory] = useState(null);
  const [removeItem, { isSuccess: isRemoved }] = useRemoveItemFromCategoryMutation();
  const [updateItem, { isSuccess: isUpdated }] = useUpdateItemMutation();

  useEffect(() => {
    if (isUpdated) {
      dispatch(addNotification({
        message: `Item ${data.title} updated`,
        type: NOTIFY_INFO
      }));
    }
  }, [isUpdated]);

  useEffect(() => {
    if (isRemoved) {
      dispatch(addNotification({
        message: `Deleted item ${data.title}`,
        type: NOTIFY_INFO
      }));
    }
  }, [isRemoved]);

  const doUpdate = async (vals) => {
    if (update) {
      await update({
        ...vals, key: key || category, sub: sub || subCategory, item: item || itemKey
      });
    } else {
      const res = await updateItem({
        ...vals, key: key || category, sub: sub || subCategory, item: item || itemKey
      }).unwrap();
      refetchAll();

      if (onSubmit) {
        onSubmit({
          ...vals, key: key || category, sub: sub || subCategory, item: item || itemKey
        });
      }
    }
  };

  const ItemFormComponent = useCallback(() => (
    <ItemForm
      onThumbClick={(arg) => {
        // console.log(arg, 'media edit');
        setShowMedia(arg);
      }}
      setCategoryThumb={setCategoryThumb}
      cancelLabel="Cancel edits"
      values={data}
      submitLabel="Update Item"
      onSubmit={doUpdate}
      onClose={() => {
        if (onClose) {
          onClose();
        } else {
          navigate(getUrl(key, sub));
        }
      }}
    />
  ), [data, isUpdated]);

  const getUpdatedUrl = () => {
    const oldC = key || category;
    const oldS = sub || subCategory || null;
    // TODO remove sub from updated url where applicable
    let url = '/category';
    if (!updatedCategory || oldC === updatedCategory) {
      url += `/${oldC}`;
      if ((!updatedSubCategory && oldS) || oldS === updatedSubCategory) {
        url += `/${oldS}`;
      }
    } else {
      url += `/${updatedCategory}`;
      if (updatedSubCategory) {
        url += `/${updatedSubCategory}`;
      }
    }
    url += `/item/${data.key}`;
    return url;
  };

  if (isLoading) return <div>Loading Data</div>;
  if (error) return <div>{error.message}</div>;

  if (isRemoved) {
    return (
      <div>
        Item removed
        <StdButton onClick={() => navigate('/')}>Done</StdButton>
      </div>
    );
  }
  return (
    <div className="w-11/12">
      {updatingItemCategories ? (
        <div>Updating category...</div>
      ) : (
        <>
          {showMedia && (
            <Modal onClose={() => setShowMedia(false)}>
              <ItemMedia
                media={showMedia}
                onRemove={async (src) => {
                  console.log('delete media');
                  const newMedia = data.media.filter((m) => m.src !== src);
                  await doUpdate({ media: newMedia });
                  refetchAll();
                }}
                setThumbnail={async (th) => {
                  const src = `${key || category}-${item || itemKey}.png`;
                  const file = new File(
                    [th],
                    src,
                    { type: th.type }
                  );
                  const res = await uploadThumbnails([file]);
                  if (res.data.results[src]) {
                    await doUpdate({
                      thumbnail: {
                        src
                      }
                    });
                    if (onSetThumb) onSetThumb();
                  }
                }}
              />
            </Modal>
          )}
          {isUpdated && (
            <div className="p-2 text-lg font-bold">Updated item!</div>
          )}
          {data.title && (
          <h2 className="text-xl p-2">
            Editing <span className="font-bold">{data.title}</span>
          </h2>
          )}
          <div className="flex flex-row justify-start items-center">
            <div className="mx-2">
              <span>
                Category
              </span>
              <ChangeCategory
                onChange={(e) => {
                  setUpdatedCategory(e.target.value);
                  if (updatedSubCategory) setUpdatedSubCategory(null);
                }}
                value={updatedCategory || key || category}
              />
            </div>
            <div className="mx-2">
              <span>
                Sub-Category
              </span>
              <ChangeSubCategory
                parent={updatedCategory || key || category}
                value={updatedSubCategory || sub || subCategory || ''}
                onChange={(e) => {
                  setUpdatedSubCategory(e.target.value);
                }}
              />
            </div>
            <div className="mx-2">
              <StdButton
                onClick={async () => {
                  setUpdatingItemCategories(true);
                  await doUpdate({
                    category: updatedCategory,
                    subCategory: updatedSubCategory || null
                  });
                  dispatch(addNotification({ message: `Moved '${data.title}' to ${updatedCategory}` }));
                  setTimeout(() => {
                    setUpdatingItemCategories(false);
                    navigate(getUpdatedUrl());
                  }, 400);
                }}
              >
                Update Category
              </StdButton>
            </div>
          </div>
          <ItemFormComponent />
          {children}
          <StdButton onClick={() => confirmAlert({
            title: 'Confirm delete item',
            message: 'This action cannot be undone.',
            buttons: [
              {
                label: 'Delete the item!',
                onClick: async () => {
                  if (onDelete) {
                    onDelete(data);
                  } else {
                    await removeItem({
                      key: key || category, sub: sub || subCategory, item: item || itemKey
                    }).unwrap();
                    refetchAll();
                  }
                }
              },
              {
                label: 'Cancel!',
                onClick: () => console.log('cancelled delete!')
              }
            ]
          })}
          >
            Delete Item
          </StdButton>
        </>
      )}

    </div>
  );
}

export default UpdateItem;
