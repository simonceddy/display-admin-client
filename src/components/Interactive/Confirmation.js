import StdButton from './StdButton';

/* eslint-disable no-unused-vars */
function Confirmation({
  onConfirm,
  onCancel,
  confirmLabel = 'Yes, I confirm',
  cancelLabel = 'No, cancel this',
  children
}) {
  return (
    <div className="absolute w-full h-full top-0 left-0 flex flex-row justify-center items-center">
      <div className="w-1/2 h-1/2 p-2 border-2 border-blue-500 bg-slate-50 text-green-800 dark:bg-slate-900 dark:text-yellow-200 flex flex-col rounded justify-center items-center">
        <div>
          {children}
        </div>
        <div className="flex flex-row justify-around items-center w-full p-2">
          <StdButton onClick={onConfirm}>
            {confirmLabel}
          </StdButton>
          <StdButton onClick={onCancel}>
            {cancelLabel}
          </StdButton>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
