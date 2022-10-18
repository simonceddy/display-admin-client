import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import SubCategoryForm from '../../components/Forms/SubCategoryForm';
import {
  addItem,
  initForm,
  removeItem,
  setItems,
  setSubValues,
  setThumbnail
} from './subCategoryFormSlice';
import StdButton from '../../components/Interactive/StdButton';
import ThumbnailRow from '../../components/Category/ThumbnailRow';
import {
  useAddSubCategoryToCategoryMutation,
  useFetchCategoryQuery,
  useFetchDataQuery
} from '../../services/api';
import NewItem from '../items/NewItem';
import EditUnsavedItem from '../items/EditUnsavedItem';
import { addNotification } from '../notifications/notificationsSlice';

function CreateSubCategory({ onClose }) {
  const { key } = useParams();
  const navigate = useNavigate();
  const {
    values,
    items,
    thumbnail
  } = useSelector((state) => state.subCategoryForm);
  const dispatch = useDispatch();
  const { data: parent } = useFetchCategoryQuery(key);
  const [addSub, { isSuccess }] = useAddSubCategoryToCategoryMutation();
  const [showItemForm, setShowItemForm] = useState(false);
  const { refetch } = useFetchCategoryQuery(key);
  const { refetch: refetchDataList } = useFetchDataQuery();
  const [initialized, setInitialized] = useState(false);
  const [editingItem, setEditingItem] = useState(false);

  useEffect(() => {
    let isInit = false;
    if (!initialized && !isInit) {
      dispatch(initForm());
      setInitialized(true);
    }
    return () => {
      isInit = true;
    };
  }, [initialized]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(addNotification({
        message: `Sub-Category added to ${parent.title}`
      }));
    }
  }, [isSuccess]);

  const refetchAll = () => {
    refetch();
    refetchDataList();
  };
  return (
    <div className="w-11/12">
      <div>
        {key ? `Create subcategory for ${key}` : null}
      </div>
      {isSuccess ? (
        <div>
          <div>Sub-Category created</div>
          <StdButton className="m-2" onClick={() => navigate('/')}>
            Done
          </StdButton>
        </div>
      ) : (
        <SubCategoryForm
          onSubmit={async (e) => {
            e.preventDefault();
            await addSub({ key, ...values, items }).unwrap();
            refetchAll();
          }}
          items={items}
          values={values}
          onClose={() => {
            if (onClose) {
              onClose();
            } else {
              navigate('/');
            }
          }}
          setValues={(vals) => dispatch(setSubValues(vals))}
        >
          <div className="w-5/6">
            items
            {showItemForm ? (
              <NewItem
                // subCategory="New Sub-Category"
                onClose={() => setShowItemForm(false)}
                onSubmit={(item) => {
                  // console.log(item);
                  dispatch(addItem(item));
                  if ((!thumbnail || !thumbnail.src)
                    && item.thumbnail
                    && item.thumbnail.src
                  ) {
                    dispatch(setThumbnail({ src: item.thumbnail.src }));
                  }
                  setShowItemForm(false);
                }}
              />
            ) : (
              <StdButton
                onClick={() => setShowItemForm(true)}
              >
                Add Item
              </StdButton>
            )}
            <div className="p-2">
              {items.length} items in category
            </div>
            <ThumbnailRow
              items={items}
              onItemClick={(i) => {
                setEditingItem(i);
                console.log(i);
              }}
            />
            {editingItem && (
              <EditUnsavedItem
                setCategoryThumb={(src) => dispatch(setThumbnail({ src }))}
                data={editingItem}
                onClose={() => setEditingItem(false)}
                onDelete={() => {
                  dispatch(removeItem(editingItem));
                  setEditingItem(false);
                }}
                onUpdate={(i) => {
                  dispatch(setItems(items.map((a) => {
                    if (a === editingItem) {
                      return i;
                    }
                    return a;
                  })));
                  setEditingItem(false);
                }}
              />
            )}
          </div>
        </SubCategoryForm>
      )}
    </div>
  );
}

export default CreateSubCategory;
