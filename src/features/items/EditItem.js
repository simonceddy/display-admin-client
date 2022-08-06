/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ItemForm from '../../components/Forms/ItemForm';
import StdButton from '../../components/Interactive/StdButton';
import { useFetchDataQuery, useFetchItemQuery } from '../../services/api';
import { initMedia, setItemValues } from './createItemSlice';
// import { useFetchDataQuery } from '../../services/api';

function EditItem({ onClose, onSubmit, submitLabel = 'Save Item' }) {
  const navigate = useNavigate();
  const { key, sub, item } = useParams();
  const { values, media } = useSelector((state) => state.itemForm);
  const dispatch = useDispatch();
  const {
    data, isLoading, error, isSuccess: dataLoaded
  } = useFetchItemQuery({ key, sub, item });
  const { refetch } = useFetchDataQuery();

  useEffect(() => {
    let formInit = false;
    if (dataLoaded && !formInit) {
      dispatch(setItemValues({ ...values, ...data }));
      dispatch(initMedia(data.media || []));
    }
    return () => {
      formInit = true;
    };
  }, [dataLoaded]);
  if (isLoading) return <div>Loading Data</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <div className="w-full flex flex-col justify-start items-center">
      <ItemForm
        media={media}
        values={values}
        onChange={(vals) => dispatch(setItemValues(vals))}
        handleFiles={console.log}
      />
      <StdButton onClick={() => {
        if (onClose) { onClose(); } else { navigate('/'); }
      }}
      >
        Done
      </StdButton>
    </div>
  );
}

export default EditItem;
