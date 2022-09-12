/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LgTextInput from '../../components/Forms/LgTextInput';
import StdButton from '../../components/Interactive/StdButton';
import ErrorBoundary from '../../containers/ErrorBoundary';
import Files from '../files/Files';
import Tiptap from '../tiptap/Tiptap';

function ItemForm({
  onSubmit,
  onClose,
  onUpload,
  submitLabel = 'Submit',
  values = {
    title: '',
    body: '',
    media: [],
    thumbnail: null
  }
}) {
  const navigate = useNavigate();
  const [body, setBody] = useState(values.body || '');
  const [title, setTitle] = useState(values.title || '');
  const [thumbnail, setThumbnail] = useState(values.thumbnail || null);
  const [media, setMedia] = useState(values.media || []);

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
          }}
        />
        <Tiptap
          label="Content:"
          id="item-body-input"
          content={body}
          setContent={(html) => {
            // console.log(html);
            setBody(html);
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
          handleUpload={(files) => {
            console.log(files);
            if (onUpload) onUpload(files);
          // Check file type
          // If video: upload in background - use object url during upload
          // Once uploaded, allow selecting frame for thumbnail
          }}
        />
        {/* TODO media list */}
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
            Done
          </StdButton>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default ItemForm;