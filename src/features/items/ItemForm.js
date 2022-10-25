/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ErrorBoundary from '../../containers/ErrorBoundary';
import Files from '../files/Files';
import getMediaType from '../../util/getMediaType';
import { addNotification } from '../notifications/notificationsSlice';
import { NOTIFY_ERROR } from '../notifications/support';
import ItemFormButtonRow from '../../components/Forms/ItemFormButtonRow';
import SetCategoryThumb from '../../components/Forms/SetCategoryThumb';
import ItemMediaRow from '../../components/Media/ItemMediaRow';
import ItemFormFields from '../../components/Forms/ItemFormFields';

function ItemForm({
  onSubmit,
  onClose,
  onUpload,
  cancelLabel = 'Done',
  onChange,
  onThumbClick,
  submitLabel = 'Submit',
  values = {
    title: '',
    body: '',
    media: [],
    thumbnail: null
  },
  setCategoryThumb
}) {
  const navigate = useNavigate();
  const [body, setBody] = useState(values.body || '');
  const [title, setTitle] = useState(values.title || '');
  const [thumbnail, setThumbnail] = useState(values.thumbnail || null);
  const [media, setMedia] = useState(values.media || []);
  const dispatch = useDispatch();
  // console.log(thumbnail);
  return (
    <ErrorBoundary>
      <ItemFormFields
        title={title}
        setTitle={(e) => {
          setTitle(e.target.value);
          if (onChange) {
            onChange({
              title: e.target.value, body, media, thumbnail
            });
          }
        }}
        body={body}
        setBody={(html) => {
          // console.log(html);
          setBody(html);
          if (onChange) {
            onChange({
              title, body: html, media, thumbnail
            });
          }
        }}
        thumbnail={thumbnail}
      />
      <Files
        onUploaded={(res, files, thumbs) => {
          console.log(thumbs);
          if (res.data && res.data.filepaths) {
            const uploadedFiles = Object.keys(res.data.filepaths);
            // console.log(uploadedFiles);
            const fls = Object.fromEntries(files.map((f) => [f.name, f]));
            console.log(fls);
            const mediaItems = uploadedFiles
              .map((file) => ({
                src: res.data.filepaths[file],
                alt: file,
                type: getMediaType(fls[file]),
                // thumbnail: thumbs && thumbs[file]
                //   ? thumbs[file]
                //   : thumbsrc(res.data.filepaths[file])
              }));
            console.log(mediaItems);
            setTimeout(() => {
              setMedia([...media, ...mediaItems]);
              if (!thumbnail) setThumbnail(mediaItems[0]);

              if (onChange) {
                onChange({
                  title, body, media, thumbnail
                });
              }
            }, 300);
          } else {
            dispatch(addNotification({
              message: 'An error has occurred when attempting upload',
              type: NOTIFY_ERROR,
            }));
          }
        }}
      />
      <ItemMediaRow
        media={media}
        thumbnail={thumbnail}
        onThumbClick={onThumbClick}
      />
      {setCategoryThumb && media[0] && (
      <SetCategoryThumb
        onClick={() => {
          // TODO
          setCategoryThumb(
            thumbnail.src ? thumbnail.src : media[0].src
          );
        }}
      />
      )}
      <ItemFormButtonRow
        submitLabel={submitLabel}
        cancelLabel={cancelLabel}
        onSubmit={() => {
          if (title && title.trim && title.trim().length > 0) {
            if (onSubmit) {
              onSubmit({
                title, body, media, thumbnail
              });
            }
          } else {
            dispatch(addNotification({
              message: 'Title is required!',
              type: NOTIFY_ERROR
            }));
          }
        }}
        onCancel={() => {
          if (onClose) { onClose(); } else { navigate('/'); }
        }}
      />
    </ErrorBoundary>
  );
}

export default ItemForm;
