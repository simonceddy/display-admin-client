/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TestItemForm from '../components/Forms/TestItemForm';
import { useFetchTestArticleQuery, useFetchTestDataQuery, useUpdateArticleMutation } from '../services/testApi';

function TestingItem() {
  const { key } = useParams();
  const {
    data, isLoading, error, isSuccess, refetch
  } = useFetchTestArticleQuery(key);
  // TODO probably a better way to refresh all data
  const { refetch: refetchAll } = useFetchTestDataQuery();
  const [updateData, {
    isLoading: isUpdating,
    isSuccess: isUpdated
  }] = useUpdateArticleMutation();
  const [formVals, setFormVals] = useState({
    title: '',
    body: ''
  });

  useEffect(() => {
    if (isSuccess) setFormVals(data);
  }, [isSuccess]);

  if (isLoading) return <div>Loading Data</div>;
  if (error) return <div>{error.message}</div>;

  const handleUpdate = async () => {
    try {
      await updateData(formVals).unwrap();
      refetch();
      refetchAll();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      Item
      {isUpdated && !isUpdating ? (
        <span>
          Updated
        </span>
      )
        : null}
      <TestItemForm
        values={formVals}
        onSubmit={handleUpdate}
        onChange={(setFormVals)}
      />
    </div>
  );
}

export default TestingItem;
