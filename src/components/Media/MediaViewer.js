import StdButton from '../Interactive/StdButton';
import ItemMedia from './ItemMedia';

function MediaViewer({
  media = {},
  alt = '',
  setThumbnail,
  onClose,
  curretThumbnail
}) {
  if (!media.src) return null;
  console.log(media.src === curretThumbnail.src);
  return (
    <div className="">
      <div className="flex flex-row justify-between items-center p-1">
        <StdButton
          className="m-2"
          onClick={() => {
            if (setThumbnail) setThumbnail(media);
          }}
          disabled={curretThumbnail && (curretThumbnail.src === media.src)}
        >
          {curretThumbnail && (curretThumbnail.src === media.src)
            ? 'Current Thumbnail'
            : 'Set as thumbnail'}
        </StdButton>
        <StdButton
          className="m-2"
          onClick={onClose}
        >
          Close
        </StdButton>
      </div>
      <ItemMedia
        src={media.src}
        alt={media.alt || alt}
        type={media.type || 'image'}
      />
    </div>
  );
}

export default MediaViewer;
