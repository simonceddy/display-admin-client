import StdButton from '../Interactive/StdButton';
import LgTextInput from './LgTextInput';

function SubCategoryForm({
  values = {}, setValues, onSubmit, children, onClose
}) {
  const changeHandler = (key) => (e) => {
    if (setValues) {
      setValues({
        ...values,
        [key]: e.target.value
      });
    }
  };
  return (
    <div className="p-2 w-full flex flex-col justify-start items-start border-2 rounded-md border-slate-400 my-2">
      <LgTextInput
        value={values.title || ''}
        label="Title"
        onChange={changeHandler('title')}
        className="m-2"
      />
      {children}
      <div className="flex m-2 flex-row justify-around items-center w-full md:w-1/2">
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
