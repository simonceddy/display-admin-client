/* eslint-disable no-unused-vars */
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useState } from 'react';
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

function UpdateItem({
  category,
  subCategory,
  onClose,
  onSubmit,
  itemKey,
  children,
  setCategoryThumb,
  onDelete,
  update
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
  const [removeItem, { isSuccess: isRemoved }] = useRemoveItemFromCategoryMutation();
  const [updateItem, { isSuccess: isUpdated }] = useUpdateItemMutation();
  // const [initialized, setInitialized] = useState(false);
  // const [showMedia, setShowMedia] = useState(null);
  // console.log(data);
  // useEffect(() => {
  //   let formInit = false;
  //   if (!initialized && dataLoaded && !formInit) {
  //     dispatch(initForm({
  //       values: {
  //         title: data.title || '',
  //         body: data.body || ''
  //       },
  //       media: data.media || [],
  //       thumbnail: data.thumbnail || { src: '', alt: '', type: 'image' }
  //     }));
  //     setInitialized(true);
  //   }
  //   return () => {
  //     formInit = true;
  //   };
  // }, [initialized, dataLoaded]);
  if (isLoading) return <div>Loading Data</div>;
  if (error) return <div>{error.message}</div>;

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
      {showMedia && (
        <Modal onClose={() => setShowMedia(false)}>
          <ItemMedia media={showMedia} />
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
      <ItemForm
        onThumbClick={(arg) => {
          console.log(arg, 'media edit');
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

    </div>
  );
}

export default UpdateItem;
