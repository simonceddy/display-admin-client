import { useDispatch, useSelector } from 'react-redux';
import ItemForm from '../../components/Forms/ItemForm';
import StdButton from '../../components/Interactive/StdButton';
import { setItemValues } from './createItemSlice';

function CreateItem({ onClose, onSubmit, submitLabel = 'Save Item' }) {
  const { values, media } = useSelector((state) => state.createItem);
  const dispatch = useDispatch();
  return (
    <div className="w-full flex flex-col justify-start items-center">
      <ItemForm
        media={media}
        values={values}
        onChange={(vals) => dispatch(setItemValues(vals))}
        handleFiles={console.log}
      />
      <StdButton onClick={() => (onSubmit ? onSubmit(values) : null)}>
        {submitLabel}
      </StdButton>
      <StdButton onClick={onClose}>
        Done
      </StdButton>
    </div>
  );
}

export default CreateItem;
