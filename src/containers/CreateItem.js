/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux';
import { LgTextInput } from '../components/Forms';
import MediaUploadForm from '../components/Forms/MediaUploadForm';
import { setItemMedia, setItemValues } from '../store/itemSlice';
import { MEDIA_BASE_URI } from '../support/consts';
import client from '../util/client';
import TextEditor from './TextEditor';

function CreateItem() {
  const values = useSelector((state) => state.item.values);
  const media = useSelector((state) => state.item.media);
  const dispatch = useDispatch();
  return (
    <div>
      <LgTextInput
        label="Title"
        id="item-title-input"
        value={values.title}
        onChange={(e) => dispatch(setItemValues(
          { ...values, title: e.target.value }
        ))}
      />
      {/* TODO how to handle state cycle with editor */}
      {/* TODO unwrap editor and use directly? */}
      <TextEditor content={values.body} />
      {/* TODO media - uploads and displaying for admin */}
      <MediaUploadForm handleFiles={(files = []) => {
        console.log(files);
        const formData = new FormData();
        formData.append('files', files);
        client.post('/media/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then((r) => console.log(r.data))
          .catch(console.error);
        // files.forEach((file) => {
        //   // console.log(file);
        //   const reader = new FileReader();

        //   reader.onabort = () => console.log('file reading was aborted');
        //   reader.onerror = () => console.log('file reading has failed');
        //   reader.onload = () => {
        //     // Do whatever you want with the file contents
        //     const binaryStr = reader.result;
        //     formData.append('files', binaryStr);

        //   reader.readAsArrayBuffer(file);
        // });
      }}
      />
      {/* TODO layout of thumbnails */}
      <div>
        {media.length === 0 ? 'No media uploaded yet' : (
          <div>
            {media.map((m, key) => {
              if (!m.src) return null;
              return (
                <img
                  key={`item-media-thumb-${key}`}
                  src={`${MEDIA_BASE_URI}thumbs/${m.src}`}
                  alt={m.alt || ''}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateItem;
