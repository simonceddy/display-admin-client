import { useState } from 'react';
import Canvas from '../../components/Canvas';
import ImgCrop from '../../components/Media/ImgCrop';
import StdButton from '../../components/Interactive/StdButton';
import Modal from '../../components/Modal';

function ImageViewer({
  file, alt = '', onRemove, thumbnail = null, setThumbnail, removeThumbnail
}) {
  if (!file) return null;
  const src = URL.createObjectURL(file);
  const [showModal, setShowModal] = useState(false);
  const [crop, setCrop] = useState(null);

  return (
    <>
      {showModal && (
      <Modal
        className="bg-black text-cyan-300 p-2 flex flex-col justify-start items-center max-w-full"
        onClose={() => setShowModal(false)}
      >
        <ImgCrop src={src} crop={crop} setCrop={setCrop} />
        <StdButton onClick={() => {
          if (setThumbnail) setThumbnail(file, crop);
          // setShowModal(false);
        }}
        >
          Set Thumbnail
        </StdButton>
        {thumbnail && (
          <StdButton onClick={() => {
            if (removeThumbnail) removeThumbnail(file);
          }}
          >
            Remove Thumbnail
          </StdButton>
        )}
        <StdButton onClick={() => setShowModal(false)}>Done</StdButton>
        <StdButton onClick={() => {
          if (onRemove) onRemove(file);
          setShowModal(false);
        }}
        >
          Remove File
        </StdButton>
      </Modal>
      )}
      <div
        onClick={() => setShowModal(true)}
        role="presentation"
        className="p-1 m-1 hover:bg-slate-500 rounded-lg"
      >
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
              height: '100px',
              width: '100px',
              objectFit: 'cover',
            }}
            src={src}
            alt={alt}
          />
        )}
      </div>
    </>
  );
}

export default ImageViewer;
