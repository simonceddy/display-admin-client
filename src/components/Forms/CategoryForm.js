import { debounce } from 'lodash';
import LgTextInput from './LgTextInput';
// import TextEditor from '../../containers/TextEditor';
import StdButton from '../Interactive/StdButton';
import CloseFormButton from '../Interactive/CloseFormButton';

function CategoryForm({
  values = {},
  setValues,
  onSubmit,
  children,
  // addSub,
  // removeSub,
  // addItem,
  // removeItem,
}) {
  const debouncedSubmit = onSubmit ? debounce(onSubmit, 500) : null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (debouncedSubmit) debouncedSubmit();
      }}
      className="flex flex-col justify-start items-start p-2 mx-auto w-11/12"
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
      {children}
      <div className="flex p-2 flex-row border-2 w-full justify-around items-center border-slate-500">
        <StdButton submits>Save</StdButton>
        <CloseFormButton />
      </div>
    </form>
  );
}

export default CategoryForm;
