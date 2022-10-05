/* eslint-disable no-unused-vars */
import { useState } from 'react';
import Canvas from '../../components/Canvas';
import ImgCrop from '../../components/Media/ImgCrop';
import StdButton from '../../components/Interactive/StdButton';
import { MEDIA_BASE_URI } from '../../support/consts';

function ImageMedia({
  src, alt = '', onRemove, thumbnail = null, setThumbnail, removeThumbnail
}) {
  if (!src) return null;
  const [crop, setCrop] = useState(null);
  console.log(src);
  return (
    <>
      {/* <ImgCrop src={src} crop={crop} setCrop={setCrop} />
      <StdButton onClick={() => {
        if (setThumbnail) setThumbnail(src, crop);
        // setShowModal(false);
      }}
      >
        Set Thumbnail
      </StdButton>
      {thumbnail && (
      <StdButton onClick={() => {
        if (removeThumbnail) removeThumbnail(src);
      }}
      >
        Remove Thumbnail
      </StdButton>
      )} */}
      {/* <StdButton onClick={() => setShowModal(false)}>Done</StdButton> */}
      <StdButton onClick={() => {
        if (onRemove) onRemove(src);
      }}
      >
        Remove File
      </StdButton>
      {thumbnail ? (
        <Canvas
          width={thumbnail.width}
          height={thumbnail.height}
          draw={(ctx) => {
            ctx.drawImage(thumbnail, 0, 0);
          }}
        />
      ) : (
        <img
          style={{
            height: '400px',
            width: '400px',
            objectFit: 'cover',
          }}
          src={`${MEDIA_BASE_URI}${src}`}
          alt={alt}
        />
      )}
    </>
  );
}

export default ImageMedia;
