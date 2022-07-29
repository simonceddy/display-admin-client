import CategoryForm from '../../components/Forms/CategoryForm';

function EditCategory({ values = {}, setVals }) {
  // console.log(values);

  if (!values) return <div>Loading data...</div>;
  // console.log(values);
  return (
    <CategoryForm values={values} setValues={setVals} />
  );
}

export default EditCategory;
