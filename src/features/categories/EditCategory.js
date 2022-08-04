/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CategoryForm from '../../components/Forms/CategoryForm';
import { useFetchCategoryQuery, useFetchDataQuery, useUpdateArticleMutation } from '../../services/api';
import { setFormValues } from './editCategorySlice';
import { emptyCategoryVals } from './support';

function EditCategory() {
  const { key } = useParams();
  const {
    data, isLoading, error, isSuccess/* , refetch */
  } = useFetchCategoryQuery(key);
  const { refetch } = useFetchDataQuery();
  const [updateData] = useUpdateArticleMutation();
  const dispatch = useDispatch();
  const { values } = useSelector((state) => (state.editCategory));
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
      onSubmit={async () => {
        console.log(values);
        await updateData({ key, ...values }).unwrap();
        refetch();
        console.log('updated');
      }}
      values={values}
      setValues={(vals) => dispatch(setFormValues(vals))}
    />
  );
}

export default EditCategory;
