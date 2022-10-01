/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LgTextInput from '../../components/Forms/LgTextInput';
import StdButton from '../../components/Interactive/StdButton';
import ErrorBoundary from '../../containers/ErrorBoundary';
import { MEDIA_BASE_URI } from '../../support/consts';
import Files from '../files/Files';
import Tiptap from '../tiptap/Tiptap';
import getMediaType from '../../util/getMediaType';
import thumbsrc from '../../util/thumbsrc';

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
  // console.log(media);
  return (
    <ErrorBoundary>
      <div className="flex flex-col w-11/12 p-1 border-2 border-slate-500 m-1">
        <LgTextInput
          label="Title"
          className="w-11/12"
          id="item-title-input"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (onChange) {
              onChange({
                title: e.target.value, body, media, thumbnail
              });
            }
          }}
        />
        <Tiptap
          label="Content:"
          id="item-body-input"
          content={body}
          setContent={(html) => {
            // console.log(html);
            setBody(html);
            if (onChange) {
              onChange({
                title, body: html, media, thumbnail
              });
            }
          }}
        />
        {/* TODO media - uploads and displaying for admin */}
        {/* <DropzoneMediaUploadForm handleFiles={handleFiles} /> */}
        {/* TODO layout of thumbnails */}
        {/* <div className="w-full flex flex-col justify-start items-start">
          {media.length === 0 ? 'No media uploaded yet' : (
            <>
              <span className="text-lg font-bold mb-2 p-2">
                Thumbnails
              </span>
              <div className="flex flex-row justify-start items-center">
                {media.map((m, key) => {
                  if (!m.src) return null;
                  const bgfill = thumbnail && thumbnail.src === m.src
                    ? 'bg-yellow-300'
                    : 'bg-green-500';
                  return (
                    <img
                      className={`m-1 p-1 ${bgfill} bg-opacity-20 hover:bg-opacity-90 rounded-md`}
                      role="presentation"
                      onClick={() => {
                        if (onThumbClick) onThumbClick(m);
                      }}
                      width={80}
                      key={`item-media-thumb-${key}`}
                      src={`${MEDIA_BASE_URI}thumbs/${m.src}`}
                      alt={m.alt || ''}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div> */}
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
            }
            // if (onUpload) onUpload(media);
          // Check file type
          // If video: upload in background - use object url during upload
          // Once uploaded, allow selecting frame for thumbnail
          }}
        />
        {/* TODO media list */}
        <div className="flex flex-row justify-evenly items-start flex-wrap p-2">
          {media.map(({ src, type = 'image', alt }, idx) => {
            const bgfill = thumbnail && thumbnail.src === src
              ? 'bg-yellow-300'
              : 'bg-green-500';
            return (
              <div key={`media-${idx}`}>
                <img
                  src={`${MEDIA_BASE_URI}thumbs/${thumbsrc(src)}`}
                  alt={alt || ''}
                  className={`m-1 p-1 ${bgfill} bg-opacity-20 hover:bg-opacity-90 rounded-md`}
                  role="presentation"
                  onClick={() => {
                    if (onThumbClick) onThumbClick(media[idx]);
                  }}
                  height="auto"
                  width={110}
                />
              </div>
            );
          })}
        </div>
        {setCategoryThumb && media[0] && (
        <div className="w-full flex flex-row justify-around items-center">
          <StdButton
            onClick={() => {
              // TODO
              setCategoryThumb(
                thumbnail.src ? thumbnail.src : media[0].src
              );
            }}
          >
            Set Category Thumbnail
          </StdButton>
        </div>
        )}
        <div className="w-full flex flex-row justify-around items-center">
          <StdButton
            onClick={() => {
              if (onSubmit) {
                onSubmit({
                  title, body, media, thumbnail
                });
              }
            }}
          >
            {submitLabel}
          </StdButton>
          <StdButton onClick={() => {
            if (onClose) { onClose(); } else { navigate('/'); }
          }}
          >
            {cancelLabel}
          </StdButton>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default ItemForm;
