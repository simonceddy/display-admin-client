/* eslint-disable no-unused-vars */
// import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ItemForm from './ItemForm';
import getUrl from '../../util/getUrl';
import { useAddItemToCategoryMutation } from '../../services/api';

function NewItem({ onSubmit, onClose }) {
  const { key, sub } = useParams();
  const navigate = useNavigate();
  const [addItemTo, { isSuccess }] = useAddItemToCategoryMutation();

  return (
    <div className="w-11/12">
      {key && (<h2>New Item for {key}{sub ? `/${sub}` : ''}</h2>)}
      {isSuccess ? (
        <div>Item created!</div>
      ) : (
        <ItemForm
          submitLabel="Save New Item"
          onSubmit={async (vals) => {
            if (onSubmit) {
              onSubmit({ key, sub, ...vals });
            } else {
              await addItemTo({
                key, sub, ...vals
              }).unwrap();
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
