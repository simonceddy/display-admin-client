import { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

function ImgCrop({ src }) {
  const [crop, setCrop] = useState();
  // console.log(crop);
  return (
    <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
      <img src={src} alt="" />
    </ReactCrop>
  );
}

export default ImgCrop;
