/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import Canvas from '../../components/Canvas';
import StdButton from '../../components/Interactive/StdButton';
import Modal from '../../components/Modal';

const defaultCanvasWidth = 400;
const defaultCanvasHeight = 300;

/* eslint-disable jsx-a11y/media-has-caption */
function VideoViewer({
  file,
  onRemove,
  thumbnail,
  setVideoThumbnail
}) {
  if (!file) return null;

  const src = URL.createObjectURL(file);
  const videoEl = document.createElement('video');
  videoEl.src = src;
  const ref = useRef(videoEl);
  const canvasRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const drawThumb = (video) => {
    const ctx = canvasRef.current.getContext('2d');
    // console.log('draw');
    const vh = video.videoHeight;
    const vw = video.videoWidth;
    const dim = {
      width: vh > vw ? defaultCanvasWidth : (defaultCanvasHeight / vh) * vw,
      height: vw > vh ? defaultCanvasHeight : (defaultCanvasWidth / vw) * vh,
    };
    const x = vh > vw ? 0 : ((dim.width - defaultCanvasWidth) / 2) * -1;
    const y = vw > vh ? 0 : ((dim.height - defaultCanvasHeight) / 2) * -1;
    // console.log(dim, vh, vw, x, y);
    ctx.drawImage(video, x, y, dim.width, dim.height);
  };

  useEffect(() => {
    let initialised = false;
    if (!initialised && canvasRef.current && ref.current) {
      console.log(file, ref.current);
      ref.current.addEventListener('canplay', () => {
        drawThumb(ref.current);
      });
    }
    return () => {
      initialised = true;
    };
  }, [file]);

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
                  Promise.resolve(
                    drawThumb(video)
                  )
                    .then(() => canvasRef.current.toBlob((blob) => {
                      if (setVideoThumbnail) setVideoThumbnail(blob);
                    }))
                    .catch(console.error);
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
          width={defaultCanvasWidth}
          height={defaultCanvasHeight}
        />
      </div>
    </>
  );
}

export default VideoViewer;
