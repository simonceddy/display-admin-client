import Tiptap from '../../features/tiptap/Tiptap';
import { MEDIA_BASE_URI } from '../../support/consts';
import thumbsrc from '../../util/thumbsrc';
import LgTextInput from './LgTextInput';

function ItemFormFields({
  title,
  body,
  // media = [],
  setTitle,
  setBody,
  // handleFiles,
  thumbnail,
  // onThumbClick
}) {
  return (
    <div className="flex flex-col w-11/12 p-1 border-2 border-slate-500 m-1">
      <div className="flex flex-row justify-between items-start">
        {thumbnail && thumbnail.src && (
        <img
          src={`${MEDIA_BASE_URI}thumbs/${thumbsrc(thumbnail.src)}`}
          alt={title}
          className="mr-2"
          style={{
            width: '150px',
            height: '150px',
            objectFit: 'cover'
          }}
        />
        )}
        <LgTextInput
          required
          label="Title"
          labelClassName="flex-1"
          className="w-11/12"
          id="item-title-input"
          value={title}
          onChange={setTitle}
        />
      </div>
      <Tiptap
        label="Content:"
        id="item-body-input"
        content={body}
        setContent={setBody}
      />
    </div>
  );
}

export default ItemFormFields;
