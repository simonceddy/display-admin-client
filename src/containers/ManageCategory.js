import { useState } from 'react';
import LgTextInput from '../components/forms/LgTextInput';
import TextEditor from './TextEditor';

function ManageCategory({ values = {} }) {
  const [vals, setVals] = useState({
    title: '',
    body: '',
    ...values
  });
  return (
    <div className="flex flex-col justify-start items-start p-2">
      {/* Category form */}
      {/* title */}
      <LgTextInput
        id="category-title-input"
        label="Title"
        value={vals.title}
        onChange={(e) => {
          setVals({ ...vals, title: e.target.value });
        }}
      />
      {/* body */}
      <TextEditor
        content={vals.body}
        onUpdate={(val) => {
          // TODO sharing state likely to have annoying side effects?
          // TODO Needs testing
          setVals({ ...vals, body: val });
        }}
      />
      {/* items and subcategories */}

      {/* item form - title, body, media */}
      {/* media */}

      {/* subcategories */}
    </div>
  );
}

export default ManageCategory;
