import { useDispatch, useSelector } from 'react-redux';
import SubCategoryForm from '../../components/Forms/SubCategoryForm';
import { setSubValues } from './createSubCategorySlice';

function CreateSubCategory({ onClose }) {
  const { values } = useSelector((state) => state.createSubCategory);
  const dispatch = useDispatch();

  return (
    <div>
      <SubCategoryForm
        values={values}
        onClose={onClose}
        setValues={(vals) => dispatch(setSubValues(vals))}
      />
    </div>
  );
}

export default CreateSubCategory;
