/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import SubCategoryForm from '../../components/Forms/SubCategoryForm';
import { addItem, initForm, setSubValues } from './subCategoryFormSlice';
import StdButton from '../../components/Interactive/StdButton';
import ThumbnailRow from '../../components/Category/ThumbnailRow';
import CreateItem from '../items/CreateItem';
import {
  useFetchCategoryQuery,
  useFetchDataQuery,
  useFetchSubCategoryQuery,
  useUpdateSubCategoryMutation,
  useRemoveSubCategoryFromCategoryMutation
} from '../../services/api';

function EditSubCategory({ onClose }) {
  const { key, sub } = useParams();
  // console.log(key, sub);
  const {
    data, isSuccess: fetched, isLoading: fetching, error, refetch: refresh
  } = useFetchSubCategoryQuery({ key, sub });
  const navigate = useNavigate();
  const { values, items } = useSelector((state) => state.subCategoryForm);
  const dispatch = useDispatch();
  const [showItemForm, setShowItemForm] = useState(false);
  const { refetch } = useFetchCategoryQuery(key);
  const { refetch: refetchDataList } = useFetchDataQuery();
  const [initialized, setInitialized] = useState(false);
  const [updateSub, { isSuccess: isUpdated }] = useUpdateSubCategoryMutation();
  const [removeSub, { isSuccess: isRemoved }] = useRemoveSubCategoryFromCategoryMutation();

  useEffect(() => {
    let isInit = false;
    if (fetched && !initialized && !isInit) {
      dispatch(initForm({
        values: { ...values, ...data },
        items: data.items,
      }));
      setInitialized(true);
    }
    return () => {
      isInit = true;
    };
  }, [initialized, fetched]);

  if (fetching) return <div>Loading Data</div>;
  if (error) return <div>{error.message}</div>;

  const refetchAll = () => {
    refresh();
    refetch();
    refetchDataList();
  };

  console.log(items);
  return (
    <div className="w-11/12">
      {isUpdated ? (
        <div>
          <div>Sub-Category updated</div>
          <StdButton className="m-2" onClick={() => navigate('/')}>
            Done
          </StdButton>
        </div>
      ) : null}
      {isRemoved ? (
        <div>
          <div>Sub-Category Removed</div>
          <StdButton className="m-2" onClick={() => navigate('/')}>
            Done
          </StdButton>
        </div>
      ) : (
        <>
          <SubCategoryForm
            onSubmit={async (e) => {
              e.preventDefault();
              console.log(key, sub);
              await updateSub({
                key, sub, ...values, items
              }).unwrap();
              refetchAll();
            }}
            items={items}
            values={values}
            onClose={() => {
              if (onClose) {
                onClose();
              } else {
                navigate('/');
              }
            }}
            setValues={(vals) => dispatch(setSubValues(vals))}
          >
            <div className="w-5/6">
              items
              {showItemForm ? (
                <CreateItem
                  subCategory="New Sub-Category"
                  onClose={() => setShowItemForm(false)}
                  onSubmit={(item) => {
                    // console.log(item);
                    dispatch(addItem(item));
                  }}
                />
              ) : (
                <StdButton
                  onClick={() => setShowItemForm(true)}
                >
                  Add Item
                </StdButton>
              )}
              <ThumbnailRow
                items={items}
                onItemClick={() => {
                  console.log('handle item edit');
                }}
              />
            </div>
          </SubCategoryForm>
          <StdButton onClick={async () => {
            await removeSub({ key, sub }).unwrap();
            refetchAll();
          }}
          >
            Delete Sub-Category
          </StdButton>
        </>
      )}
    </div>
  );
}

export default EditSubCategory;