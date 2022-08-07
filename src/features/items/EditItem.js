/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ItemForm from '../../components/Forms/ItemForm';
import StdButton from '../../components/Interactive/StdButton';
import {
  useFetchCategoryQuery,
  useFetchDataQuery,
  useFetchItemQuery,
  useRemoveItemFromCategoryMutation,
  useUpdateItemMutation
} from '../../services/api';
import client from '../../util/client';
import createMediaObject from '../../util/createMediaObject';
import { addItemMedia, initForm, setItemValues } from './itemFormSlice';
// import { useFetchDataQuery } from '../../services/api';

function EditItem({ onClose, onSubmit, submitLabel = 'Save Item' }) {
  const navigate = useNavigate();
  const { key, sub, item } = useParams();
  const { values, media } = useSelector((state) => state.itemForm);
  const dispatch = useDispatch();
  const { refetch } = useFetchCategoryQuery(key);
  const { refetch: refetchDataList } = useFetchDataQuery();
  const refetchAll = () => {
    refetch();
    refetchDataList();
  };
  const {
    data, isLoading, error, isSuccess: dataLoaded, refetch: refresh
  } = useFetchItemQuery({ key, sub, item });
  const [removeItem, { isSuccess: isRemoved }] = useRemoveItemFromCategoryMutation();
  const [updateItem, { isSuccess: isUpdated }] = useUpdateItemMutation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    let formInit = false;
    if (!initialized && dataLoaded && !formInit) {
      dispatch(initForm({
        values: {
          title: data.title || '',
          body: data.body || ''
        },
        media: data.media || []
      }));
      setInitialized(true);
    }
    return () => {
      formInit = true;
    };
  }, [initialized, dataLoaded]);
  if (isLoading) return <div>Loading Data</div>;
  if (error) return <div>{error.message}</div>;
  console.log(values);
  return (
    <div className="w-full flex flex-col justify-start items-center">
      {isUpdated ? (<div>Item Updated</div>) : null}
      {isRemoved ? (<div>Item Removed</div>) : (
        <>
          <ItemForm
            media={media}
            values={values}
            onChange={(vals) => dispatch(setItemValues(vals))}
            handleFiles={(files) => {
              // TODO handle type and alt defaults for media uploads
              console.log(files);
              const formData = new FormData();
              files.map((file) => formData.append(file.name, file));
              client.post('/media/upload', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
                .then((r) => {
                  if (r.data.success && r.data.filepaths) {
                    setTimeout(() => {
                      Object.values(r.data.filepaths)
                        .map((src) => dispatch(
                          addItemMedia(createMediaObject(src))
                        ));
                    }, 500);
                  }
                  // TODO handle failed upload
                })
                .catch(console.error);
            }}
          />
          <StdButton onClick={async () => {
            await removeItem({ key, sub, item });
            refetch();
          }}
          >
            Delete Item
          </StdButton>
        </>
      )}
      <StdButton onClick={async () => {
        await updateItem({
          key: data.category, item: data.key, ...values, media
        }).unwrap();
        refetchAll();
        refresh();
      }}
      >
        Save Changes
      </StdButton>
      <StdButton onClick={() => {
        if (onClose) { onClose(); } else { navigate('/'); }
      }}
      >
        Done
      </StdButton>
    </div>
  );
}

export default EditItem;
