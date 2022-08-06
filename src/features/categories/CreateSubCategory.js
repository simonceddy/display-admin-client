import { useDispatch, useSelector } from 'react-redux';
import SubCategoryForm from '../../components/Forms/SubCategoryForm';
import { setSubValues } from './createSubCategorySlice';

function CreateSubCategory({ onClose, onSubmit }) {
  const { values, items } = useSelector((state) => state.createSubCategory);
  const dispatch = useDispatch();

  return (
    <div>
      <SubCategoryForm
        onSubmit={(e) => {
          e.preventDefault();
          if (onSubmit) onSubmit(values);
        }}
        items={items}
        values={values}
        onClose={onClose}
        setValues={(vals) => dispatch(setSubValues(vals))}
      />
    </div>
  );
}

export default CreateSubCategory;
