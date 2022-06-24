import { useState } from 'react';
import LgTextInput from './LgTextInput';
// import TextEditor from '../../containers/TextEditor';
import StdButton from '../Interactive/StdButton';
import ThumbnailRow from '../Category/ThumbnailRow';

function CategoryForm({
  values = {}, items = [], subs = [], setValues, onSubmit
}) {
  const [showItemForm, setShowItemForm] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit) onSubmit();
      }}
      className="flex flex-col justify-start items-start p-2"
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
      <div>
        {/* TODO bring up item form inline or as modal */}
        items
        {showItemForm ? (
          <div>
            Item form
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
      <div>Sub-categories
        {subs.length} total sub-categories;
      </div>
      <StdButton submits>Save</StdButton>
    </form>
  );
}

export default CategoryForm;
