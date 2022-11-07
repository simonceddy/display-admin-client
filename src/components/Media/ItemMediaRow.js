import { MEDIA_BASE_URI } from '../../support/consts';
import thumbsrc from '../../util/thumbsrc';

function ItemMediaRow({ media, thumbnail, onThumbClick }) {
  return (
    <div className="flex flex-row justify-start items-center flex-wrap p-2">
      <div className="text-xl mr-2">Media</div>
      {media.map(({ src, /* type = 'image', */ alt }, idx) => {
        const bgfill = thumbnail && thumbnail.src === src
          ? 'bg-yellow-300'
          : 'bg-green-500';
        return (
          <div key={`media-${idx}`} className="flex flex-col justify-center items-center overflow-hidden overflow-ellipsis">
            <img
              src={`${MEDIA_BASE_URI}thumbs/${thumbsrc(src)}`}
              alt={alt || ''}
              className={`m-1 p-1 ${bgfill} bg-opacity-20 hover:bg-opacity-90 rounded-md`}
              role="presentation"
              onClick={() => {
                if (onThumbClick) onThumbClick(media[idx]);
              }}
              style={{
                objectFit: 'cover',
                height: '110px',
                width: '110px',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default ItemMediaRow;
