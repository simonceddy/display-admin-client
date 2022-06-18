import { useState } from 'react';
import CategoryForm from '../components/Forms/CategoryForm';

function CreateCategory() {
  const [vals, setVals] = useState({
    title: '',
    body: '',
  });
  return (
    <CategoryForm values={vals} setValues={setVals} />
  );
}

export default CreateCategory;
