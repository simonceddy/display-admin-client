/* eslint-disable no-unused-vars */
// import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ItemForm from './ItemForm';
import getUrl from '../../util/getUrl';
import { useAddItemToCategoryMutation } from '../../services/api';
import useRefetchAll from '../../hooks/useRefetchAll';

function NewItem({
  onSubmit,
  onClose,
  setCategoryThumb,
  category,
  subCategory,
  onCreated
}) {
  const { key, sub } = useParams();
  const navigate = useNavigate();
  const [addItemTo, { isSuccess }] = useAddItemToCategoryMutation();
  const refetchAll = useRefetchAll({ category: key });
  return (
    <div className="w-11/12">
      {key && (<h2>New Item for {key}{sub ? `/${sub}` : ''}</h2>)}
      {isSuccess ? (
        <div>Item created!</div>
      ) : (
        <ItemForm
          setCategoryThumb={setCategoryThumb}
          cancelLabel="Cancel new item"
          submitLabel="Save New Item"
          onSubmit={async (vals) => {
            if (onSubmit) {
              onSubmit({ key: key || category, sub: sub || subCategory, ...vals });
            } else {
              const res = await addItemTo({
                key: key || category, sub: sub || subCategory, ...vals
              }).unwrap();
              refetchAll();
              if (onCreated) onCreated(res);
            }
          }}
          onClose={() => {
            if (onClose) {
              onClose();
            } else {
              navigate(getUrl(key, sub));
            }
          }}
        />
      )}
    </div>
  );
}

export default NewItem;
