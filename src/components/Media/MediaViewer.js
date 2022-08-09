import StdButton from '../Interactive/StdButton';
import ItemMedia from './ItemMedia';

function MediaViewer({ media = {}, alt = '', setThumbnail }) {
  if (!media.src) return null;
  // console.log(media);
  return (
    <div className="">
      <div className="">
        <StdButton
          onClick={() => {
            if (setThumbnail) setThumbnail(media);
          }}
        >
          Set as thumbnail
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
