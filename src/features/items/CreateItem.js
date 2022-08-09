/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ItemForm from '../../components/Forms/ItemForm';
import StdButton from '../../components/Interactive/StdButton';
import { useAddItemToCategoryMutation, useFetchDataQuery } from '../../services/api';
import {
  addItemMedia, initForm, setItemValues, setThumbnail
} from './itemFormSlice';
import client from '../../util/client';
import createMediaObject from '../../util/createMediaObject';
import Modal from '../../components/Modal';
import MediaViewer from '../../components/Media/MediaViewer';

function CreateItem({
  onClose,
  onSubmit,
  submitLabel = 'Save Item',
  category,
  subCategory,
}) {
  const navigate = useNavigate();
  const { key, sub } = useParams();
  const { values, media, thumbnail } = useSelector((state) => state.itemForm);
  const dispatch = useDispatch();
  const [initialized, setInitialized] = useState(false);

  const [addItemTo, { isSuccess }] = useAddItemToCategoryMutation();
  const { refetch } = useFetchDataQuery();
  const [showMedia, setShowMedia] = useState(null);

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
    <div className="w-full flex flex-col justify-start items-center">
      {showMedia ? (
        <Modal onClose={() => setShowMedia(null)}>
          <MediaViewer
            setThumbnail={(m) => {
              dispatch(setThumbnail(m));
            }}
            media={showMedia}
            alt={values.title}
          />
        </Modal>
      ) : null}
      {key || category ? (
        <h2>
          New item for {key || category}{(sub || subCategory) ? `/${sub || subCategory}` : ''}
        </h2>
      ) : null}
      {isSuccess ? <div>Item Saved</div> : ''}
      <ItemForm
        onThumbClick={(m) => setShowMedia(m)}
        media={media}
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
                    console.log(m);
                    return dispatch(addItemMedia(m));
                  }), 400);
              }
              // TODO handle failed upload
            })
            .catch(console.error);
        }}
      />
      <div className="w-full flex flex-row justify-around items-center">
        <StdButton onClick={async () => {
          if (onSubmit) {
            await onSubmit(values);
          } else if (key) {
            await addItemTo({
              key, sub, ...values, media, thumbnail
            }).unwrap();
          }
          refetch();
        }}
        >
          {submitLabel}
        </StdButton>
        <StdButton onClick={() => {
          if (onClose) { onClose(); } else { navigate('/'); }
        }}
        >
          Done
        </StdButton>
      </div>
    </div>
  );
}

export default CreateItem;
