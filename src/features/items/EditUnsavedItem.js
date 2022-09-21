import { confirmAlert } from 'react-confirm-alert';
import StdButton from '../../components/Interactive/StdButton';
import ItemForm from './ItemForm';

function EditUnsavedItem({
  data,
  children,
  setCategoryThumb,
  onUpdate,
  onClose,
  onDelete
}) {
  return (
    <div>
      <ItemForm
        setCategoryThumb={setCategoryThumb}
        cancelLabel="Cancel edits"
        values={data}
        submitLabel="Update Item"
        onSubmit={onUpdate}
        onClose={onClose}
      />
      {children}
      <StdButton onClick={() => confirmAlert({
        title: 'Confirm delete item',
        message: 'This action cannot be undone.',
        buttons: [
          {
            label: 'Delete the item!',
            onClick: () => (onDelete ? onDelete(data) : null)
          },
          {
            label: 'Cancel!',
            onClick: () => console.log('cancelled delete!')
          }
        ]
      })}
      >
        Delete Item
      </StdButton>
    </div>
  );
}

export default EditUnsavedItem;
