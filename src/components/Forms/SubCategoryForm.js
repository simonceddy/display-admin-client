import { useState } from 'react';
import ThumbnailRow from '../Category/ThumbnailRow';
import StdButton from '../Interactive/StdButton';
import ItemForm from './ItemForm';
import LgTextInput from './LgTextInput';

function SubCategoryForm({
  values = {}, setValues, onSubmit, items = [], onClose
}) {
  const [showItemForm, setShowItemForm] = useState(false);
  const changeHandler = (key) => (e) => {
    if (setValues) {
      setValues({
        ...values,
        [key]: e.target.value
      });
    }
  };
  return (
    <div className="p-1 flex flex-col justify-start items-center border-2 rounded-md border-slate-400 my-2">
      <LgTextInput
        value={values.title || ''}
        label="Title"
        onChange={changeHandler('title')}
      />
      <div>
        {/* TODO bring up item form inline or as modal */}
        items
        {showItemForm ? (
          <div>
            <ItemForm />
            <StdButton onClick={() => setShowItemForm(false)}>Done</StdButton>
          </div>
        ) : (
          <StdButton
            onClick={() => setShowItemForm(true)}
          >
            Add Item
          </StdButton>
        )}
        <ThumbnailRow items={items} />
      </div>
      <div className="flex flex-row justify-around items-center w-full md:w-1/2">
        <StdButton onClick={onSubmit}>
          Save Sub-Category
        </StdButton>
        <StdButton onClick={onClose}>
          Close Form
        </StdButton>
      </div>
    </div>
  );
}

export default SubCategoryForm;
