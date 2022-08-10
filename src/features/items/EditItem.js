/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ItemForm from '../../components/Forms/ItemForm';
import StdButton from '../../components/Interactive/StdButton';
import MediaViewer from '../../components/Media/MediaViewer';
import Modal from '../../components/Modal';
import {
  useFetchCategoryQuery,
  useFetchDataQuery,
  useFetchItemQuery,
  useRemoveItemFromCategoryMutation,
  useUpdateItemMutation
} from '../../services/api';
import client from '../../util/client';
import createMediaObject from '../../util/createMediaObject';
import {
  addItemMedia,
  initForm,
  setItemValues,
  setThumbnail
} from './itemFormSlice';
// import { useFetchDataQuery } from '../../services/api';

function EditItem({ onClose, category, subCategory }) {
  const navigate = useNavigate();
  const { key, sub, item } = useParams();
  const { values, media, thumbnail } = useSelector((state) => state.itemForm);
  const dispatch = useDispatch();
  const { refetch } = useFetchCategoryQuery(key || category);
  const { refetch: refetchDataList } = useFetchDataQuery();
  const refetchAll = () => {
    refetch();
    refetchDataList();
  };
  const {
    data, isLoading, error, isSuccess: dataLoaded, refetch: refresh
  } = useFetchItemQuery({
    key: key || category,
    sub: sub || subCategory,
    item
  });
  const [removeItem, { isSuccess: isRemoved }] = useRemoveItemFromCategoryMutation();
  const [updateItem, { isSuccess: isUpdated }] = useUpdateItemMutation();
  const [initialized, setInitialized] = useState(false);
  const [showMedia, setShowMedia] = useState(null);
  // console.log(data);
  useEffect(() => {
    let formInit = false;
    if (!initialized && dataLoaded && !formInit) {
      dispatch(initForm({
        values: {
          title: data.title || '',
          body: data.body || ''
        },
        media: data.media || [],
        thumbnail: data.thumbnail || { src: '', alt: '', type: 'image' }
      }));
      setInitialized(true);
    }
    return () => {
      formInit = true;
    };
  }, [initialized, dataLoaded]);
  if (isLoading) return <div>Loading Data</div>;
  if (error) return <div>{error.message}</div>;
  // console.log(values);
  const doUpdate = async () => {
    await updateItem({
      key: key || category,
      sub: sub || subCategory || null,
      item: data.key,
      ...values,
      media,
      thumbnail
    }).unwrap();
    refetchAll();
    refresh();
  };
  return (
    <div className="w-full flex flex-col justify-start items-center">
      {showMedia ? (
        <Modal onClose={() => setShowMedia(null)}>
          <MediaViewer
            curretThumbnail={thumbnail}
            onClose={() => setShowMedia(null)}
            setThumbnail={(m) => {
              dispatch(setThumbnail(m));
            }}
            media={showMedia}
            alt={values.title}
          />
        </Modal>
      ) : null}
      {isUpdated ? (<div>Item Updated</div>) : null}
      {isRemoved ? (<div>Item Removed</div>) : (
        <>
          <ItemForm
            onThumbClick={(m) => setShowMedia(m)}
            media={media}
            thumbnail={thumbnail}
            values={values}
            onChange={(vals) => dispatch(setItemValues(vals))}
            handleFiles={(files) => {
              // TODO handle type and alt defaults for media uploads
              // console.log(files);
              const formData = new FormData();
              files.map((file) => formData.append(file.name, file));
              client.post('/media/upload', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
                .then((r) => {
                  console.log(r);
                  if (r.data.success && r.data.filepaths) {
                    setTimeout(() => Object.values(r.data.filepaths)
                      .map((src) => {
                        const m = createMediaObject(src);
                        if (thumbnail.src === '') {
                          // set as thumbnail
                          dispatch(setThumbnail(m));
                        }
                        // console.log(m);
                        return dispatch(addItemMedia(m));
                      }), 500);
                    // doUpdate();
                  }
                  // TODO handle failed upload
                })
                .catch(console.error);
            }}
          />
          <StdButton onClick={async () => {
            await removeItem({ key, sub, item }).unwrap();
            refetchAll();
            refresh();
          }}
          >
            Delete Item
          </StdButton>
        </>
      )}
      <div className="w-full flex flex-row justify-around items-center">
        <StdButton onClick={doUpdate}>
          Save Changes
        </StdButton>
        <StdButton onClick={() => {
          if (onClose) { onClose(); } else { navigate('/'); }
        }}
        >
          {isRemoved || isUpdated ? 'Done' : 'Cancel Edits'}
        </StdButton>
      </div>
    </div>
  );
}

export default EditItem;
