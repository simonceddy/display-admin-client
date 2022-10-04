/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import Canvas from '../../components/Canvas';
import StdButton from '../../components/Interactive/StdButton';
import { MEDIA_BASE_URI } from '../../support/consts';

const defaultCanvasWidth = 400;
const defaultCanvasHeight = 300;

/* eslint-disable jsx-a11y/media-has-caption */
function VideoMedia({
  src,
  onRemove,
  thumbnail,
  setThumbnail
}) {
  if (!src) return null;

  // const videoEl = document.createElement('video');
  const ref = useRef(null);
  const canvasRef = useRef(null);

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
      canvasRef.current.crossOrigin = 'anonymous';
      ref.current.crossOrigin = 'anonymous';
      console.log(src, ref.current);
      ref.current.addEventListener('loadeddata', () => {
        drawThumb(ref.current);
        console.log('can play');
      });
    }
    return () => {
      initialised = true;
    };
  }, [src]);

  const doSetThumb = (blob) => {
    if (setThumbnail) setThumbnail(blob);
  };

  return (
    <>
      <video
        ref={ref}
        src={`${MEDIA_BASE_URI}${src}`}
        controls
        style={{
          height: '300px',
          width: 'auto'
        }}
      />
      <div className="w-full justify-around items-center flex flex-row">
        <StdButton onClick={(e) => {
          if (ref.current) {
            const video = ref.current;
            // console.log(video.currentTime);
            if (canvasRef.current) {
              Promise.resolve(
                drawThumb(video)
              )
                .then(() => canvasRef.current.toBlob((blob) => {
                  doSetThumb(blob);
                }))
                .catch(console.error);
            }
          }
        }}
        >
          Use Current Frame As Thumbnail
        </StdButton>
        {/* <StdButton
          onClick={() => console.log(ref.current)}
        >
          Log
        </StdButton> */}
        <StdButton onClick={() => {
          if (onRemove) onRemove(src);
        }}
        >
          Remove File
        </StdButton>
      </div>
      <div
        // onClick={() => }
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

export default VideoMedia;
