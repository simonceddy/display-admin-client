// import TextEditor from '../../containers/TextEditor';
import { MEDIA_BASE_URI } from '../../support/consts';
import DropzoneMediaUploadForm from './DropzoneMediaUploadForm';
import LgTextInput from './LgTextInput';
import Textarea from './Textarea';

function ItemForm({
  values = {}, media = [], onChange, handleFiles, thumbnail, onThumbClick
}) {
  return (
    <div className="flex flex-col w-11/12 p-1 border-2 border-slate-500 m-1">
      <LgTextInput
        label="Title"
        className="w-11/12"
        id="item-title-input"
        value={values.title}
        onChange={(e) => {
          if (onChange) onChange({ ...values, title: e.target.value });
        }}
      />
      <Textarea
        label="Content:"
        id="item-body-input"
        value={values.body}
        onChange={(e) => {
          if (onChange) onChange({ ...values, body: e.target.value });
        }}
      />
      {/* TODO how to handle state cycle with editor */}
      {/* TODO unwrap editor and use directly? */}
      {/* <TextEditor content={values.body} /> */}
      {/* TODO media - uploads and displaying for admin */}
      <DropzoneMediaUploadForm handleFiles={handleFiles} />
      {/* TODO layout of thumbnails */}
      <div className="w-full flex flex-col justify-start items-start">
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
      </div>
    </div>
  );
}

export default ItemForm;
