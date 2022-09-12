/* eslint-disable no-unused-vars */
// import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ItemForm from './ItemForm';
import getUrl from '../../util/getUrl';
import { useAddItemToCategoryMutation } from '../../services/api';

function NewItem() {
  const { key, sub } = useParams();
  const navigate = useNavigate();
  const [addItemTo, { isSuccess }] = useAddItemToCategoryMutation();

  return (
    <div>
      {key && (<h2>New Item for {key}{sub ? `/${sub}` : ''}</h2>)}
      {isSuccess ? (
        <div>Item created!</div>
      ) : (
        <ItemForm
          submitLabel="Save New Item"
          onSubmit={async (vals) => {
            await addItemTo({
              key, sub, ...vals
            }).unwrap();
          }}
          onClose={() => {
            navigate(getUrl(key, sub));
          }}
        />
      )}
    </div>
  );
}

export default NewItem;
