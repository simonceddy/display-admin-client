import { useState } from 'react';
import { LgTextInput } from '../components/Forms';
import TextEditor from './TextEditor';

function ManageItem({ values }) {
  const [vals, setVals] = useState({
    title: '',
    body: '',
    media: [],
    frontImg: null,
    ...values,
  });
  return (
    <div>
      <LgTextInput
        label="Title"
        id="item-title-input"
        value={vals.title}
        onChange={(e) => setVals({ ...vals, title: e.target.value })}
      />
      {/* TODO how to handle state cycle with editor */}
      {/* TODO unwrap editor and use directly? */}
      <TextEditor content={vals.body} />
      {/* TODO media - uploads and displaying for admin */}
    </div>
  );
}

export default ManageItem;
