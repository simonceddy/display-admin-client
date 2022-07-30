/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CategoryForm from '../../components/Forms/CategoryForm';
import { useFetchCategoryQuery } from '../../services/api';
import { setFormValues } from './editCategorySlice';

function EditCategory() {
  const { key } = useParams();
  const {
    data, isLoading, error, isSuccess, refetch
  } = useFetchCategoryQuery(key);
  const dispatch = useDispatch();
  const { values } = useSelector((state) => state.editCategory);
  useEffect(() => {
    if (isSuccess) {
      dispatch(setFormValues(data));
    }
  }, [isSuccess]);

  if (isLoading) return <div>Loading Data</div>;
  if (error) return <div>{error.message}</div>;
  console.log(values);
  return (
    <CategoryForm
      values={values}
      setValues={(vals) => dispatch(setFormValues(vals))}
    />
  );
}

export default EditCategory;
