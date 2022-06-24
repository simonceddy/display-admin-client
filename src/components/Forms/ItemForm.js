import TextEditor from '../../containers/TextEditor';
import { MEDIA_BASE_URI } from '../../support/consts';
import DropzoneMediaUploadForm from './DropzoneMediaUploadForm';
import LgTextInput from './LgTextInput';

function ItemForm({
  values = {}, media = [], onChange, handleFiles
}) {
  return (
    <div>
      <LgTextInput
        label="Title"
        id="item-title-input"
        value={values.title}
        onChange={onChange}
      />
      {/* TODO how to handle state cycle with editor */}
      {/* TODO unwrap editor and use directly? */}
      <TextEditor content={values.body} />
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
                return (
                  <img
                    className="m-1 p-1 bg-green-500 bg-opacity-20 hover:bg-opacity-90 rounded-md"
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
