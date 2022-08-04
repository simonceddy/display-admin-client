import { useState } from 'react';
import { debounce } from 'lodash';
import LgTextInput from './LgTextInput';
// import TextEditor from '../../containers/TextEditor';
import StdButton from '../Interactive/StdButton';
import ThumbnailRow from '../Category/ThumbnailRow';
import ItemForm from './ItemForm';
import SubCategoryForm from './SubCategoryForm';

function CategoryForm({
  values = {}, items = [], subs = [], setValues, onSubmit
}) {
  const [showItemForm, setShowItemForm] = useState(false);
  const [showSubForm, setShowSubForm] = useState(false);
  const debouncedSubmit = onSubmit ? debounce(onSubmit, 500) : null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (debouncedSubmit) debouncedSubmit();
      }}
      className="flex flex-col justify-start items-start p-2 w-11/12"
    >
      {/* Category form */}
      {/* title */}
      <LgTextInput
        id="category-title-input"
        className="mb-2"
        label="Title"
        value={values.title}
        onChange={(e) => {
          if (setValues) setValues({ ...values, title: e.target.value });
        }}
      />
      {/* body */}
      {/* <TextEditor
        content={values.body}
        onUpdate={(val) => {
          // TODO sharing state likely to have annoying side effects?
          // TODO Needs testing
          setValues({ ...values, body: val });
        }}
      /> */}
      {/* items and subcategories */}
      <div className="border-2 rounded-md border-slate-400 my-2 w-full">
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
      {/* item form - title, body, media */}
      {/* media */}

      {/* subcategories */}
      <div className="border-2 rounded-md border-slate-400 my-2 w-full">
        {subs.length} total sub-categories
        {showSubForm ? (
          <div>
            <SubCategoryForm onClose={() => setShowSubForm(false)} />
          </div>
        ) : (
          <StdButton
            onClick={() => setShowSubForm(true)}
          >
            Add Sub-Category
          </StdButton>
        )}
      </div>
      <StdButton submits>Save</StdButton>
    </form>
  );
}

export default CategoryForm;
