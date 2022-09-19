import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import SubCategoryForm from '../../components/Forms/SubCategoryForm';
import { addItem, initForm, setSubValues } from './subCategoryFormSlice';
import StdButton from '../../components/Interactive/StdButton';
import ThumbnailRow from '../../components/Category/ThumbnailRow';
import { useAddSubCategoryToCategoryMutation, useFetchCategoryQuery, useFetchDataQuery } from '../../services/api';
import NewItem from '../items/NewItem';

function CreateSubCategory({ onClose }) {
  const { key } = useParams();
  const navigate = useNavigate();
  const { values, items } = useSelector((state) => state.subCategoryForm);
  const dispatch = useDispatch();
  const [addSub, { isSuccess }] = useAddSubCategoryToCategoryMutation();
  const [showItemForm, setShowItemForm] = useState(false);
  const { refetch } = useFetchCategoryQuery(key);
  const { refetch: refetchDataList } = useFetchDataQuery();
  const [initialized, setInitialized] = useState(false);

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
                }}
              />
            ) : (
              <StdButton
                onClick={() => setShowItemForm(true)}
              >
                Add Item
              </StdButton>
            )}
            <ThumbnailRow
              items={items}
              onItemClick={() => {
                console.log('handle item edit');
              }}
            />
          </div>
        </SubCategoryForm>
      )}
    </div>
  );
}

export default CreateSubCategory;
