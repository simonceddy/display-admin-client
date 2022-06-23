/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux';
import { LgTextInput } from '../components/Forms';
import DropzoneMediaUploadForm from '../components/Forms/DropzoneMediaUploadForm';
import { addItemMedia, setItemValues } from '../store/itemSlice';
import { MEDIA_BASE_URI } from '../support/consts';
import client from '../util/client';
import createMediaObject from '../util/createMediaObject';
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
      <DropzoneMediaUploadForm handleFiles={(files) => {
        console.log(files);
        const formData = new FormData();
        files.map((file) => formData.append(file.name, file));
        client.post('/media/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then((r) => {
            if (r.data.success && r.data.filepaths) {
              setTimeout(() => {
                Object.values(r.data.filepaths)
                  .map((src) => dispatch(
                    addItemMedia(createMediaObject(src))
                  ));
              }, 500);
            }
            // TODO handle failed upload
          })
          .catch(console.error);
      }}
      />
      {/* TODO layout of thumbnails */}
      <div className="w-full flex flex-col justify-start items-start">
        {media.length === 0 ? 'No media uploaded yet' : (
          <>
            <span className="text-lg font-bold mb-2 p-2">
              Thumbnails
            </span>
            <div className="flex flex-row justify-start items-center">
              {media.map((m, key) => {
                if (!m.src) return null;
                return (
                  <img
                    className="m-1 p-1 bg-green-500 bg-opacity-20 hover:bg-opacity-90 rounded-md"
                    width={80}
                    key={`item-media-thumb-${key}`}
                    src={`${MEDIA_BASE_URI}thumbs/${m.src}`}
                    alt={m.alt || ''}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CreateItem;
