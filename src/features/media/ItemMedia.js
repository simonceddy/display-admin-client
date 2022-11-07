import ImageMedia from './ImageMedia';
import VideoMedia from './VideoMedia';

function ItemMedia({
  media = {}, setThumbnailFromVideo, setThumbnailFromImage, onRemove, onClose
}) {
  const MediaEl = media.type === 'video' ? VideoMedia : ImageMedia;
  return (
    <div>
      <MediaEl
        onClose={onClose}
        onRemove={onRemove}
        src={media.src}
        setThumbnail={media.type === 'video' ? setThumbnailFromVideo : setThumbnailFromImage}
      />
    </div>
  );
}

export default ItemMedia;
