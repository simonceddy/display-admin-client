import { useDispatch, useSelector } from 'react-redux';
import CategoryForm from '../../components/Forms/CategoryForm';
import { setCategoryValues } from '../../store/newCategorySlice';

function CreateCategory() {
  const values = useSelector((state) => state.newCategory.values);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col justify-start items-center w-full p-2">
      <h2 className="mx-2 mt-2 mb-4 text-xl font-bold p-1 border-b-2 border-slate-500">
        Create a new Category
      </h2>
      <CategoryForm
        values={values}
        setValues={(vals) => dispatch(setCategoryValues(vals))}
      />
    </div>
  );
}

export default CreateCategory;
