import StdButton from '../Interactive/StdButton';

function ItemFormButtonRow({
  submitLabel, cancelLabel, onSubmit, onCancel
}) {
  return (
    <div className="w-full flex flex-row justify-around items-center">
      <StdButton
        onClick={onSubmit}
      >
        {submitLabel}
      </StdButton>
      <StdButton onClick={onCancel}>
        {cancelLabel}
      </StdButton>
    </div>
  );
}

export default ItemFormButtonRow;
