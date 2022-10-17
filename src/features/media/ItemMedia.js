import ImageMedia from './ImageMedia';
import VideoMedia from './VideoMedia';

function ItemMedia({ media = {}, setThumbnail, onRemove }) {
  const MediaEl = media.type === 'video' ? VideoMedia : ImageMedia;
  return (
    <div>
      <MediaEl
        onRemove={onRemove}
        src={media.src}
        setThumbnail={setThumbnail}
      />
    </div>
  );
}

export default ItemMedia;
