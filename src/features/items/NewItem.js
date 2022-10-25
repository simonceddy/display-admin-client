/* eslint-disable no-unused-vars */
// import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ItemForm from './ItemForm';
import getUrl from '../../util/getUrl';
import { useAddItemToCategoryMutation, useFetchCategoryQuery } from '../../services/api';
import useRefetchAll from '../../hooks/useRefetchAll';
import StdButton from '../../components/Interactive/StdButton';
import { addNotification } from '../notifications/notificationsSlice';
import Modal from '../../components/Modal';
import ItemMedia from '../media/ItemMedia';

function NewItem({
  onSubmit,
  onClose,
  setCategoryThumb,
  category,
  subCategory,
  onCreated
}) {
  const { key, sub } = useParams();
  const [showMedia, setShowMedia] = useState(false);
  const navigate = useNavigate();
  const [addItemTo, { isSuccess }] = useAddItemToCategoryMutation();
  const { data: parent } = useFetchCategoryQuery(key || category);
  const refetchAll = useRefetchAll({ category: key || category });
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(addNotification({
        message: `Item added to ${parent.title}`,
      }));
    }
  }, [isSuccess]);

  return (
    <div className="w-11/12">
      {key && (<h2>New Item for {key}{sub ? `/${sub}` : ''}</h2>)}
      {isSuccess ? (
        <div className="flex flex-col justify-start items-center">
          <div className="text-2xl font-bold">Item created!</div>
          <StdButton
            onClick={() => {
              navigate(0);
            }}
          >
            Add Another Item
          </StdButton>
        </div>
      ) : (
        <>
          {showMedia && (
          <Modal onClose={() => setShowMedia(false)}>
            <ItemMedia
              media={showMedia}
              // onRemove={async (src) => {
              //   console.log('delete media');
              //   const newMedia = data.media.filter((m) => m.src !== src);
              //   await doUpdate({ media: newMedia });
              //   refetchAll();
              // }}
              // setThumbnail={async (th) => {
              //   const src = `${key || category}-${item || itemKey}.png`;
              //   const file = new File(
              //     [th],
              //     src,
              //     { type: th.type }
              //   );
              //   const res = await uploadThumbnails([file]);
              //   if (res.data.results[src]) {
              //     await doUpdate({
              //       thumbnail: {
              //         src
              //       }
              //     });
              //     if (onSetThumb) onSetThumb();
              //   }
              // }}
            />
          </Modal>
          )}
          <ItemForm
            setCategoryThumb={setCategoryThumb}
            cancelLabel="Cancel new item"
            submitLabel="Save New Item"
            onThumbClick={(a) => setShowMedia(a)}
            onSubmit={async (vals) => {
              if (onSubmit) {
                onSubmit({ key: key || category, sub: sub || subCategory, ...vals });
              } else {
                const res = await addItemTo({
                  key: key || category, sub: sub || subCategory, ...vals
                }).unwrap();
                refetchAll();
                if (onCreated) onCreated(res);
              }
            }}
            onClose={() => {
              if (onClose) {
                onClose();
              } else {
                navigate(getUrl(key, sub));
              }
            }}
          />
        </>
      )}
    </div>
  );
}

export default NewItem;
