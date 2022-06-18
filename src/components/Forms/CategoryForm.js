import LgTextInput from './LgTextInput';
import TextEditor from '../../containers/TextEditor';

function CategoryForm({ values = {}, setValues }) {
  return (
    <div className="flex flex-col justify-start items-start p-2">
      {/* Category form */}
      {/* title */}
      <LgTextInput
        id="category-title-input"
        label="Title"
        value={values.title}
        onChange={(e) => {
          if (setValues) setValues({ ...values, title: e.target.value });
        }}
      />
      {/* body */}
      <TextEditor
        content={values.body}
        onUpdate={(val) => {
          // TODO sharing state likely to have annoying side effects?
          // TODO Needs testing
          setValues({ ...values, body: val });
        }}
      />
      {/* items and subcategories */}

      {/* item form - title, body, media */}
      {/* media */}

      {/* subcategories */}
    </div>
  );
}

export default CategoryForm;