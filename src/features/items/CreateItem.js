/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ItemForm from '../../components/Forms/ItemForm';
import StdButton from '../../components/Interactive/StdButton';
import { useAddItemToCategoryMutation, useFetchDataQuery } from '../../services/api';
import { initForm, setItemValues } from './itemFormSlice';

function CreateItem({ onClose, onSubmit, submitLabel = 'Save Item' }) {
  const navigate = useNavigate();
  const { key, sub } = useParams();
  const { values, media } = useSelector((state) => state.itemForm);
  const dispatch = useDispatch();
  const [initialized, setInitialized] = useState(false);

  const [addItemTo, { isSuccess }] = useAddItemToCategoryMutation();
  const { refetch } = useFetchDataQuery();

  useEffect(() => {
    let isInit = false;
    if (!initialized && !isInit) {
      dispatch(initForm());
      setInitialized(true);
    }
    return () => {
      isInit = true;
    };
  }, [initialized]);

  return (
    <div className="w-full flex flex-col justify-start items-center">
      {key ? (
        <h2>New item for {key}{sub ? `/${sub}` : ''}</h2>
      ) : null}
      {isSuccess ? <div>Item Saved</div> : ''}
      <ItemForm
        media={media}
        values={values}
        onChange={(vals) => dispatch(setItemValues(vals))}
        handleFiles={console.log}
      />
      <StdButton onClick={async () => {
        if (onSubmit) {
          await onSubmit(values);
        } else if (key) {
          await addItemTo({ key, sub, ...values }).unwrap();
        }
        refetch();
      }}
      >
        {submitLabel}
      </StdButton>
      <StdButton onClick={() => {
        if (onClose) { onClose(); } else { navigate('/'); }
      }}
      >
        Done
      </StdButton>
    </div>
  );
}

export default CreateItem;
