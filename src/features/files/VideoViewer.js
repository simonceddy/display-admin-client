/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import Canvas from '../../components/Canvas';
import StdButton from '../../components/Interactive/StdButton';
import Modal from '../../components/Modal';

/* eslint-disable jsx-a11y/media-has-caption */
function VideoViewer({
  file,
  onRemove,
  thumbnail
}) {
  if (!file) return null;

  const src = URL.createObjectURL(file);

  const ref = useRef(null);
  const canvasRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const drawThumb = (video) => {
    const ctx = canvasRef.current.getContext('2d');
    console.log('draw');
    const vh = video.videoHeight;
    const vw = video.videoWidth;
    const dim = {
      width: vh > vw ? 100 : (100 / vh) * vw,
      height: vw > vh ? 100 : (100 / vw) * vh,
    };
    console.log(dim, vh, vw);
    ctx.drawImage(video, 0, 0, dim.width, dim.height);
  };

  // useEffect(() => {
  //   let initialised = false;
  //   if (!initialised && ref.current) {
  //     const vid = ref.current;
  //     vid.addEventListener('canplaythrough', () => {
  //       console.log('can play');
  //       if (canvasRef.current) {
  //         drawThumb(vid);
  //       }
  //     }, false);
  //   }
  //   return () => {
  //     initialised = true;
  //   };
  // }, [ref.current]);

  return (
    <>
      {showModal && (
        <Modal
          className="bg-black text-cyan-300 p-2 flex flex-col justify-start items-center max-w-full"
          onClose={() => setShowModal(false)}
        >
          <video
            ref={ref}
            src={src}
            controls
            style={{
              height: '500px',
              width: 'auto'
            }}
          />
          <div className="w-full justify-around items-center flex flex-row">
            <StdButton onClick={() => setShowModal(false)}>Done</StdButton>
            <StdButton onClick={(e) => {
              if (ref.current) {
                const video = ref.current;
                console.log(video.currentTime);
                if (canvasRef.current) {
                  drawThumb(video);
                }
              }
            }}
            >
              Use Current Frame As Thumbnail
            </StdButton>
            <StdButton
              onClick={() => console.log(ref.current)}
            >
              Log
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
        <Canvas
          ref={canvasRef}
          // draw={() => {
          //   if (ref.current) drawThumb(ref.current);
          // }}
          width={100}
          height={100}
        />
      </div>
    </>
  );
}

export default VideoViewer;
