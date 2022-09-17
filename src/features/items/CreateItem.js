/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ItemForm from '../../components/Forms/ItemForm';
import StdButton from '../../components/Interactive/StdButton';
import {
  useAddItemToCategoryMutation,
  useFetchDataQuery
} from '../../services/api';
import {
  addItemMedia, initForm, setItemValues, setThumbnail
} from './itemFormSlice';
import createMediaObject from '../../util/createMediaObject';
import Modal from '../../components/Modal';
import MediaViewer from '../../components/Media/MediaViewer';
import { uploadFiles } from '../../util/uploads';
import Files from '../files/Files';

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
            onClose={() => setShowMedia(null)}
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
        onChange={(vals) => {
          console.log(vals);
          dispatch(setItemValues(vals));
        }}
        handleFiles={(files) => {
          // TODO handle type and alt defaults for media uploads
          // console.log(files);
          uploadFiles(files)
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
                    // TODO check media type
                    return dispatch(addItemMedia(m));
                  }), 400);
              }
              // TODO handle failed upload
            })
            .catch(console.error);
        }}
      />
      <Files
        handleUpload={(files) => {
          console.log(files);
          // Check file type
          // If video: upload in background - use object url during upload
          // Once uploaded, allow selecting frame for thumbnail
        }}
      />
      <div className="w-full flex flex-row justify-around items-center">
        <StdButton onClick={async () => {
          console.log(values);
          if (onSubmit) {
            await onSubmit({ ...values, media, thumbnail });
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
