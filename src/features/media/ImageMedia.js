/* eslint-disable no-unused-vars */
import { useState } from 'react';
import DropzoneMediaUploadForm from '../../components/Forms/DropzoneMediaUploadForm';
import StdButton from '../../components/Interactive/StdButton';

function FileToImage(props) {
  const { file } = props;
  if (!file) return null;
  return (
    <img alt={props.alt || ''} {...props} src={URL.createObjectURL(file)} />
  );
}

function ImageMedia() {
  const [media, setMedia] = useState([]);
  return (
    <div>
      <DropzoneMediaUploadForm
        handleFiles={(files) => {
          console.log(files);
          // Validate files
          // If image add to media
          // TODO handle video - get still for thumbnail/preview
          // Add to media
        }}
      />
      <div>
        {media.map((m, index) => (
          <div key={`media-${index}`}>
            {/* {
              TODO click on file preview to open larger view with option for
              cropping thumbnail
            } */}
            <FileToImage file={m} />
          </div>
        ))}
      </div>
      <StdButton onClick={() => {
        console.log('confirm files');
      }}
      >
        Confirm
      </StdButton>
    </div>
  );
}

export default ImageMedia;
