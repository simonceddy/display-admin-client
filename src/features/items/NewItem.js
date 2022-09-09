/* eslint-disable no-unused-vars */
// import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ItemForm from './ItemForm';
import getUrl from '../../util/getUrl';

function NewItem() {
  const { key, sub } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      {key && (<h2>New Item for {key}{sub ? `/${sub}` : ''}</h2>)}
      <ItemForm
        submitLabel="Save New Item"
        onSubmit={(vals) => {
          console.log(vals);
        }}
        onClose={() => {
          navigate(getUrl(key, sub));
        }}
      />
    </div>
  );
}

export default NewItem;
