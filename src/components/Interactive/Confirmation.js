import Modal from '../Modal';
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
    <Modal onClose={onCancel}>
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
    </Modal>
  );
}

export default Confirmation;
