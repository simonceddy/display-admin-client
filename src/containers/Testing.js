/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import StdButton from '../components/Interactive/StdButton';
import { useCreateArticleMutation, useDeleteArticleMutation, useFetchTestDataQuery } from '../services/testApi';
import TestItemForm from '../components/Forms/TestItemForm';

const newArticle = {
  title: '',
  body: ''
};

function Testing() {
  const {
    data, error, isLoading, refetch
  } = useFetchTestDataQuery();
  const [createArticle, {
    isLoading: isSaving,
    isSuccess: isSaved
  }] = useCreateArticleMutation();
  const [showAddArticleForm, setShowAddArticleForm] = useState(false);
  const [newArticleVals, setNewArticleVals] = useState(newArticle);
  const [deleteArticle, { isSuccess: isDeleted }] = useDeleteArticleMutation();

  if (isLoading) return <div>Loading Data</div>;
  if (error) return <div>{error.message}</div>;

  const handleAddItem = async () => {
    try {
      await createArticle(newArticleVals).unwrap();
      setNewArticleVals(newArticle);
      refetch();
      setShowAddArticleForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteItem = async (key) => {
    try {
      await deleteArticle(key).unwrap();
      refetch();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex flex-col justify-start items-start p-4 w-full">
      <h2>
        Testing api
      </h2>
      {isDeleted ? 'Deleted article' : null}
      {showAddArticleForm ? (
        <TestItemForm
          values={newArticleVals}
          onChange={setNewArticleVals}
          onSubmit={handleAddItem}
        />
      ) : (
        <>
          {isSaved && !isSaving ? 'New Article Saved' : null}
          <StdButton onClick={() => setShowAddArticleForm(true)}>
            Add Item
          </StdButton>
        </>
      )}
      <ul className="flex flex-col justify-start items-start p-2 w-full">
        {data.map((i) => (
          <li
            key={`test-item-${i.key}`}
            className="px-2 py-1 w-full flex flex-row justify-between items-center bg-slate-500 bg-opacity-20 rounded-md my-1"
          >
            <Link
              className="mr-2 hover:underline w-1/4 overflow-x-hidden overflow-ellipsis whitespace-nowrap text-lg font-bold"
              to={`/tests/item/${i.key}`}
            >
              {i.title}
            </Link>
            <span className="flex-1 p-1 bg-blue-500 bg-opacity-20 rounded-md">
              {i.body}
            </span>
            <span className="w-1/6 justify-end items-end flex flex-row">
              {/* TODO confirm */}
              <StdButton onClick={() => {
                console.log(`delete article ${i.key}`);
                handleDeleteItem(i.key);
              }}
              >
                Delete
              </StdButton>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Testing;
