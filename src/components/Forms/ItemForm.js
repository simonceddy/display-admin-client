// import TextEditor from '../../containers/TextEditor';
import ErrorBoundary from '../../containers/ErrorBoundary';
import Tiptap from '../../features/tiptap/Tiptap';
// import { MEDIA_BASE_URI } from '../../support/consts';
// import DropzoneMediaUploadForm from './DropzoneMediaUploadForm';
import LgTextInput from './LgTextInput';
// import Textarea from './Textarea';

function ItemForm({
  values = {},
  children,
  // media = [],
  onChange,
  // handleFiles,
  // thumbnail,
  // onThumbClick
}) {
  return (
    <ErrorBoundary>
      <div className="flex flex-col w-11/12 p-1 border-2 border-slate-500 m-1">
        <LgTextInput
          label="Title"
          className="w-11/12"
          id="item-title-input"
          value={values.title}
          onChange={(e) => {
            if (onChange) {
              onChange({
                ...values,
                title: e.target.value
              });
            }
          }}
        />
        <Tiptap
          label="Content:"
          id="item-body-input"
          content={values.body}
          setContent={(html) => {
            // console.log(html);
            if (onChange) onChange({ ...values, body: html });
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
        <div>{children}</div>
      </div>
    </ErrorBoundary>
  );
}

export default ItemForm;
