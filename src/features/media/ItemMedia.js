import ImageMedia from './ImageMedia';
import VideoMedia from './VideoMedia';

function ItemMedia({ media = {}, setThumbnail }) {
  const MediaEl = media.type === 'video' ? VideoMedia : ImageMedia;
  return (
    <div>
      <MediaEl
        src={media.src}
        setThumbnail={setThumbnail}
      />
    </div>
  );
}

export default ItemMedia;
