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
      {key || category ? (
        <h2>
          New item for {key || category}{(sub || subCategory) ? `/${sub || subCategory}` : ''}
        </h2>
      ) : null}
      {isSuccess ? <div>Item Saved</div> : ''}
      <ItemForm
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
      <StdButton onClick={async () => {
        if (onSubmit) {
          await onSubmit(values);
        } else if (key) {
          await addItemTo({ key, sub, ...values }).unwrap();
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
  );
}

export default CreateItem;
