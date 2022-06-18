import { useState } from 'react';
import { connect } from 'react-redux';
import CategoryForm from '../components/Forms/CategoryForm';

function ManageCategory({ values = {} }) {
  console.log(values);
  const [vals, setVals] = useState({
    title: '',
    body: '',
    ...values
  });
  return (
    <CategoryForm values={vals} setValues={setVals} />
  );
}

export default connect()(ManageCategory);
