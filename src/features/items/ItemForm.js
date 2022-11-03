/* eslint-disable no-unused-vars */
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ErrorBoundary from '../../containers/ErrorBoundary';
// import Files from '../files/Files';
import getMediaType from '../../util/getMediaType';
import { addNotification } from '../notifications/notificationsSlice';
import { NOTIFY_ERROR } from '../notifications/support';
import ItemFormButtonRow from '../../components/Forms/ItemFormButtonRow';
import SetCategoryThumb from '../../components/Forms/SetCategoryThumb';
import ItemMediaRow from '../../components/Media/ItemMediaRow';
import ItemFormFields from '../../components/Forms/ItemFormFields';
import { fileStates, getFileComponent } from '../files/support';
import uploadFiles from '../../util/uploads/uploadFiles';
import uploadThumbnails from '../../util/uploads/uploadThumbnail';
import FileDropzone from '../../components/FileDropzone';
import StdButton from '../../components/Interactive/StdButton';
import thumbsrc from '../../util/thumbsrc';

function ItemForm({
  onSubmit,
  onClose,
  cancelLabel = 'Done',
  onChange,
  onThumbClick,
  submitLabel = 'Submit',
  values = {
    title: '',
    body: '',
    media: [],
    thumbnail: null
  },
  setCategoryThumb
}) {
  const navigate = useNavigate();
  const [body, setBody] = useState(values.body || '');
  const [title, setTitle] = useState(values.title || '');
  const [thumbnail, setThumbnail] = useState(values.thumbnail || null);
  const [media, setMedia] = useState(values.media || []);
  const dispatch = useDispatch();
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
      console.log('here i am man of jam');
      // Set state to uploading
      setUploadState(fileStates.UPLOADING);

      // Get thumbnail keys corresponding to filename
      const ths = Object.keys(thumbnails);
      // console.log(fls);

      // Upload files to server
      const res = await uploadFiles(tempFiles);

      // TODO thumbnail assignment/uploading
      // If thumbnails are present and files were uploaded successfully
      if (res.data.filepaths && ths.length > 0) {
        // Upload thumbnails
        const thumbData = ths
          .filter((fn) => res.data.filepaths[fn])
          .map((fn) => {
            const nm = res.data.filepaths[fn];
            const blob = thumbnails[fn];
            return new File(
              [blob],
              thumbsrc(nm),
              { type: blob.type }
            );
          });
        const thRes = await uploadThumbnails(thumbData);
        // console.log(thRes.data);
      }
      // console.log(res.status);
      // If uploads successful set upload stae to uploaded and clear temp files
      if (res.status === 200) {
        // If onUploaded is set, run it with the required data.
        // TODO provide adequate args to onUpload
        // if (onUploaded) onUploaded(res, tempFiles, ths);
        // console.log(res);
        if (res.data && res.data.filepaths) {
          const uploadedFiles = Object.keys(res.data.filepaths);
          // console.log(uploadedFiles);
          const fls = Object.fromEntries(tempFiles.map((f) => [f.name, f]));
          console.log(fls);
          const mediaItems = uploadedFiles
            .map((file) => ({
              src: res.data.filepaths[file],
              alt: file,
              type: getMediaType(fls[file]),
              // thumbnail: thumbs && thumbs[file]
              //   ? thumbs[file]
              //   : thumbsrc(res.data.filepaths[file])
            }));
          console.log(mediaItems);
          setTimeout(() => {
            setMedia([...media, ...mediaItems]);
            if (!thumbnail) setThumbnail(mediaItems[0]);

            if (onChange) {
              onChange({
                title, body, media, thumbnail
              });
            }
          }, 300);
        } else {
          dispatch(addNotification({
            message: 'An error has occurred when attempting upload',
            type: NOTIFY_ERROR,
          }));
        }
        setTimeout(() => {
          setUploadState(fileStates.UPLOADED);
          setTempFiles([]);
          setThumbnails({});
        }, 500);
      } else {
        setUploadState(fileStates.UNSAVED);
      }
    }
  };

  const doSubmit = async () => {
    if (title && title.trim && title.trim().length > 0) {
      if (tempFiles.length > 0) {
        await onUpload();
      }
      if (onSubmit) {
        await onSubmit({
          title, body, media, thumbnail
        });
      }
    } else {
      dispatch(addNotification({
        message: 'Title is required!',
        type: NOTIFY_ERROR
      }));
    }
  };
  // console.log(thumbnail);
  return (
    <ErrorBoundary>
      <ItemFormFields
        title={title}
        setTitle={(e) => {
          setTitle(e.target.value);
          if (onChange) {
            onChange({
              title: e.target.value, body, media, thumbnail
            });
          }
        }}
        body={body}
        setBody={(html) => {
          // console.log(html);
          setBody(html);
          if (onChange) {
            onChange({
              title, body: html, media, thumbnail
            });
          }
        }}
        thumbnail={thumbnail}
      />
      {/* <Files
        onUploaded={(res, files, thumbs) => {
          // console.log(thumbs);
          if (res.data && res.data.filepaths) {
            const uploadedFiles = Object.keys(res.data.filepaths);
            // console.log(uploadedFiles);
            const fls = Object.fromEntries(files.map((f) => [f.name, f]));
            console.log(fls);
            const mediaItems = uploadedFiles
              .map((file) => ({
                src: res.data.filepaths[file],
                alt: file,
                type: getMediaType(fls[file]),
                // thumbnail: thumbs && thumbs[file]
                //   ? thumbs[file]
                //   : thumbsrc(res.data.filepaths[file])
              }));
            console.log(mediaItems);
            setTimeout(() => {
              setMedia([...media, ...mediaItems]);
              if (!thumbnail) setThumbnail(mediaItems[0]);

              if (onChange) {
                onChange({
                  title, body, media, thumbnail
                });
              }
            }, 300);
          } else {
            dispatch(addNotification({
              message: 'An error has occurred when attempting upload',
              type: NOTIFY_ERROR,
            }));
          }
        }}
      /> */}
      <div className="bg-cyan-500 bg-opacity-30 my-2">
        <div ref={ref} className="flex flex-wrap flex-row justify-start items-center w-full bg-cyan-500 bg-opacity-30">
          {uploadState === fileStates.UPLOADING && (
          <div className="text-xl p-2 font-bold">Uploading...</div>
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
                    const thb = await createImageBitmap(
                      fl,
                      crop.x,
                      crop.y,
                      crop.width,
                      crop.height
                    );
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
            disabled={uploadState !== fileStates.UNSAVED}
            onClick={onUpload}
          >
            Save media
          </StdButton>
        </div>
      </div>
      <ItemMediaRow
        media={media}
        thumbnail={thumbnail}
        onThumbClick={onThumbClick}
      />
      {setCategoryThumb && media[0] && (
      <SetCategoryThumb
        onClick={() => {
          // TODO
          setCategoryThumb(
            thumbnail.src ? thumbnail.src : media[0].src
          );
        }}
      />
      )}
      <ItemFormButtonRow
        submitLabel={submitLabel}
        cancelLabel={cancelLabel}
        onSubmit={doSubmit}
        onCancel={() => {
          if (onClose) { onClose(); } else { navigate('/'); }
        }}
      />
    </ErrorBoundary>
  );
}

export default ItemForm;
