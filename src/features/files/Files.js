/* eslint-disable no-unused-vars */
import { useRef, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import FileDropzone from '../../components/FileDropzone';
import StdButton from '../../components/Interactive/StdButton';
import uploadFiles from '../../util/uploadFiles';
import uploadThumbnails from '../../util/uploadThumbnail';
// import StdButton from '../../components/Interactive/StdButton';
import ImageViewer from './ImageViewer';
import VideoViewer from './VideoViewer';
// import ImgCrop from '../../components/ImgCrop';

function getFileComponent(file, props = {}) {
  if (file.type) {
    switch (file.type) {
      case 'video/mp4':
      case 'video/x-m4v':
      case 'video/webm':
        return <VideoViewer {...props} file={file} />;
      case 'image/jpeg':
      case 'image/png':
      case 'image/gif':
      case 'image/svg+xml':
        return <ImageViewer {...props} file={file} />;
      default:
    }
  }
  return null;
}

const fileStates = {
  UNSAVED: 'UNSAVED',
  UPLOADING: 'UPLOADING',
  UPLOADED: 'UPLOADED',
};

function Files({ handleUpload }) {
  const ref = useRef(null);
  const [tempFiles, setTempFiles] = useState([]);
  const [uploadState, setUploadState] = useState(fileStates.UNSAVED);
  const [thumbnails, setThumbnails] = useState({});

  function addFiles(files = []) {
    setTempFiles([...tempFiles, ...files]);
  }

  function removeFile(file) {
    setTempFiles(tempFiles.filter((f) => f !== file));
  }

  const onUpload = async () => {
    if (tempFiles.length > 0) {
      setUploadState(fileStates.UPLOADING);
      const ths = Object.keys(thumbnails);
      // console.log(fls);
      const res = await uploadFiles(tempFiles);
      if (res.data.filepaths && ths.length > 0) {
        const thRes = await uploadThumbnails(ths
          .filter((fn) => res.data.filepaths[fn])
          .map((fn) => {
            let nm = res.data.filepaths[fn];
            const blob = thumbnails[fn];
            if (!nm.endsWith('.png')) nm = `${nm}.png`;
            return new File(
              [blob],
              nm,
              { type: blob.type }
            );
          }));
        console.log(thRes.data);
      }

      if (res.status === 200) {
        if (handleUpload) handleUpload(res);
        setTimeout(() => {
          setUploadState(fileStates.UPLOADED);
          setTempFiles([]);
          setThumbnails({});
        }, 300);
      } else {
        setUploadState(fileStates.UNSAVED);
      }
    }
  };

  // console.log(thumbnails);

  return (
    <>
      <div ref={ref} className="flex flex-wrap flex-row justify-start items-center w-full bg-cyan-500 bg-opacity-30">
        {uploadState === fileStates.UPLOADING && (
          <div>Uploading...</div>
        )}
        {uploadState === fileStates.UNSAVED && (
          tempFiles.map((f, idx) => (
            <div key={`file-${idx}-${f.name}`}>
              {getFileComponent(f, {
                onRemove: (fl) => removeFile(fl),
                thumbnail: thumbnails[f.name] || null,
                setVideoThumbnail: (blob) => {
                  // console.log(blob,);
                  setThumbnails({
                    ...thumbnails,
                    [f.name]: blob
                  });
                },
                setThumbnail: async (fl, crop) => {
                  console.log(crop, fl instanceof Blob);
                  const thb = await createImageBitmap(fl, crop.x, crop.y, crop.width, crop.height);
                  if (thb) {
                    setThumbnails({ ...thumbnails, [f.name]: thb });
                  }
                },
                removeThumbnail: (fl) => {
                  const nt = thumbnails;
                  delete nt[fl.name];
                  setThumbnails(nt);
                }
              })}
            </div>
          ))
        )}
        {uploadState === fileStates.UPLOADED && <div>Uploaded!</div>}
        {/* {files ? (<ImgCrop src={URL.createObjectURL(files)} />) : ''} */}
      </div>
      <FileDropzone onDrop={(f = []) => {
        if (f[0]) {
          console.log(f[0]);
          //   const img = new Image();
          //   img.src = URL.createObjectURL(f[0]);
          //   ref.current.appendChild(img);
          addFiles(f);
          if (uploadState !== fileStates.UNSAVED) {
            setUploadState(fileStates.UNSAVED);
          }
        }
      }}
      />
      <div>
        <StdButton
          onClick={onUpload}
        >
          Save media
        </StdButton>
      </div>
    </>
  );
}

export default Files;
