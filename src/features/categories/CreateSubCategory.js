import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import SubCategoryForm from '../../components/Forms/SubCategoryForm';
import { setSubValues } from './subCategoryFormSlice';

function CreateSubCategory({ onClose, onSubmit }) {
  const { key } = useParams();
  const navigate = useNavigate();
  const { values, items } = useSelector((state) => state.subCategoryForm);
  const dispatch = useDispatch();

  return (
    <div>
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
      />
    </div>
  );
}

export default CreateSubCategory;
