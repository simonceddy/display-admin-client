import ImageMedia from './ImageMedia';
import VideoMedia from './VideoMedia';

function ItemMedia({ media = {} }) {
  console.log(media);
  const MediaEl = media.type === 'video' ? VideoMedia : ImageMedia;
  return (
    <div>
      <MediaEl src={media.src} />
    </div>
  );
}

export default ItemMedia;
