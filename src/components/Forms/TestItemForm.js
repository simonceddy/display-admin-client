// import { useState } from 'react';
import LgTextInput from './LgTextInput';
import StdButton from '../Interactive/StdButton';

const defaultValues = {
  title: '',
  body: ''
};

function TestItemForm({ onSubmit, values = defaultValues, onChange }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit) onSubmit(values);
      }}
    >
      <h3>
        Form
      </h3>
      <LgTextInput
        id="test-item-title"
        value={values.title}
        onChange={(e) => {
          if (onChange) onChange({ ...values, title: e.target.value });
        }}
      />
      <LgTextInput
        id="test-item-body"
        value={values.body}
        onChange={(e) => {
          if (onChange) onChange({ ...values, body: e.target.value });
        }}
      />
      <StdButton submits>
        Done
      </StdButton>
    </form>
  );
}

export default TestItemForm;
