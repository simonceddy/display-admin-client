import { useEffect, useRef, useState } from 'react';
import StdButton from '../../components/Interactive/StdButton';
import Modal from '../../components/Modal';

/* eslint-disable jsx-a11y/media-has-caption */
function VideoViewer({
  file,
  onRemove,
  thumbnail
}) {
  if (!file) return null;
  const ref = useRef(null);
  const vRef = useRef(null);
  const src = URL.createObjectURL(file);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let initialised = false;
    if (!initialised && ref.current) {
      const vid = ref.current;
      vid.addEventListener('loadeddata', () => {
        const rand = Math.round(Math.random() * vid.duration * 1000) + 1;
        console.log(rand, thumbnail, vid);
      }, false);
    }
    return () => {
      initialised = true;
    };
  }, [ref.current]);

  useEffect(() => {
    let initialised = false;
    if (!initialised && vRef.current) {
      const vid = vRef.current;
      vid.addEventListener('loadeddata', () => {
        const rand = Math.round(Math.random() * vid.duration * 1000) + 1;
        console.log(rand, thumbnail, vid);
      }, false);
      vid.addEventListener('seeked', () => {
        console.log('seeked');
      });
    }
    return () => {
      initialised = true;
    };
  }, [vRef.current]);

  return (
    <>
      {showModal && (
        <Modal
          className="bg-black text-cyan-300 p-2 flex flex-col justify-start items-center max-w-full"
          onClose={() => setShowModal(false)}
        >
          <video
            ref={vRef}
            src={src}
            controls
            style={{
              height: '500px',
              width: 'auto'
            }}
          />
          <div className="w-full justify-around items-center flex flex-row">
            <StdButton onClick={() => setShowModal(false)}>Done</StdButton>
            <StdButton onClick={() => {
              if (vRef.current) {
                const video = vRef.current;
                console.log(video);
              }
            }}
            >
              Use Current Frame As Thumbnail
            </StdButton>
            <StdButton
              onClick={() => console.log(vRef.current)}
            >Log
            </StdButton>
            <StdButton onClick={() => {
              if (onRemove) onRemove(file);
              setShowModal(false);
            }}
            >
              Remove File
            </StdButton>
          </div>
        </Modal>
      )}
      <div
        onClick={() => setShowModal(true)}
        role="presentation"
        className="p-1 m-1 hover:bg-slate-500 rounded-lg"
      >
        <video
          ref={ref}
          src={src}
          style={{
            height: '100px',
            width: '100px',
            objectFit: 'cover',
          }}
        />
      </div>
    </>
  );
}

export default VideoViewer;
