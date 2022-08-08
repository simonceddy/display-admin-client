import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import SubCategoryForm from '../../components/Forms/SubCategoryForm';
import { addItem, setSubValues } from './subCategoryFormSlice';
import StdButton from '../../components/Interactive/StdButton';
import ThumbnailRow from '../../components/Category/ThumbnailRow';
import CreateItem from '../items/CreateItem';

function CreateSubCategory({ onClose, onSubmit }) {
  const { key } = useParams();
  const navigate = useNavigate();
  const { values, items } = useSelector((state) => state.subCategoryForm);
  const dispatch = useDispatch();
  const [showItemForm, setShowItemForm] = useState(false);

  return (
    <div className="w-11/12">
      <div>
        {key ? `Create subcategory for ${key}` : null}
      </div>
      <SubCategoryForm
        onSubmit={(e) => {
          e.preventDefault();
          if (onSubmit) onSubmit(values);
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
          {/* TODO bring up item form inline or as modal */}
          items
          {showItemForm ? (
            <CreateItem
              subCategory="New Sub-Category"
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
          <ThumbnailRow items={items} />
        </div>
      </SubCategoryForm>
    </div>
  );
}

export default CreateSubCategory;
