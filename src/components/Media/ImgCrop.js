// import { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import StdButton from '../Interactive/StdButton';

function ImgCrop({
  src, onConfirm, imgStyle = {}, crop = null, setCrop
}) {
  // console.log(crop);
  return (
    <>
      <ReactCrop
        crop={crop}
        onChange={(c) => {
          if (setCrop) setCrop(c);
        }}
      >
        <img
          style={{
            maxHeight: '500px',
            width: 'auto',
            objectFit: 'scale-down',
            ...imgStyle
          }}
          src={src}
          alt=""
        />
      </ReactCrop>
      <StdButton
        onClick={() => {
          console.log(crop);
          if (onConfirm) onConfirm(crop);
        }}
      >
        Confirm
      </StdButton>
    </>
  );
}

export default ImgCrop;
