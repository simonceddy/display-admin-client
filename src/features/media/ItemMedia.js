import ImageMedia from './ImageMedia';
import VideoMedia from './VideoMedia';

function ItemMedia({
  media = {}, setThumbnail, onRemove, onClose
}) {
  const MediaEl = media.type === 'video' ? VideoMedia : ImageMedia;
  return (
    <div>
      <MediaEl
        onClose={onClose}
        onRemove={onRemove}
        src={media.src}
        setThumbnail={setThumbnail}
      />
    </div>
  );
}

export default ItemMedia;
