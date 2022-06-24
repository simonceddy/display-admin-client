/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ItemForm from '../components/Forms/ItemForm';
import { addItemMedia, setItemValues } from '../store/itemSlice';
import client from '../util/client';
import createMediaObject from '../util/createMediaObject';

function CreateItem() {
  // TODO make aware of parent category
  const { key: categoryKey, sub: subCategoryKey } = useParams();
  const values = useSelector((state) => state.item.values);
  const media = useSelector((state) => state.item.media);
  const dispatch = useDispatch();

  // TODO setItemValues only does title at present
  // TODO set thumbnail for display
  return (
    <div className="w-full flex flex-col justify-start items-center p-2">
      <h2 className="mx-2 mt-2 mb-4 text-xl font-bold p-1 border-b-2 border-slate-500">
        Add a new item to category: {categoryKey}{subCategoryKey ? `/${subCategoryKey}` : null}
      </h2>
      <ItemForm
        values={values}
        media={media}
        onChange={(e) => dispatch(setItemValues(
          { ...values, title: e.target.value }
        ))}
        handleFiles={(files) => {
          // TODO handle type and alt defaults for media uploads
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
    </div>
  );
}

export default CreateItem;
