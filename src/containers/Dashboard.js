// import { useSelector } from 'react-redux';
import FilterButton from '../components/Interactive/FilterButton';
// import { displayApi } from '../services/api';
// import { Link } from 'react-router-dom';
import CategorySummary from './CategorySummary';

function Dashboard({ data = [], filter, filterBy = () => {} }) {
  // const data = useSelector((state) => state[displayApi.reducerPath].data);
  return (
    <div className="flex flex-col justify-start items-start w-full p-3">
      <h1 className="font-bold text-4xl underline mb-3 mt-1 rounded w-full">
        Dashboard
      </h1>
      <div className="flex flex-col justify-start items-start w-full mt-2 bg-green-500 bg-opacity-20 p-2">
        <h2 className="text-xl mb-2 font-bold">Categories:</h2>
        <div className="flex flex-row justify-start items-center bg-blue-100 dark:bg-blue-900 rounded p-1 my-2">
          <span>
            Show:
          </span>
          <FilterButton
            disabled={filter === 'current'}
            onClick={() => filterBy('current')}
          >
            Current
          </FilterButton>
          <FilterButton
            disabled={filter === 'archived'}
            onClick={() => filterBy('archived')}
          >
            archived
          </FilterButton>
          <FilterButton
            disabled={filter === 'unpublished'}
            onClick={() => filterBy('unpublished')}
          >
            unpublished
          </FilterButton>
          <FilterButton
            disabled={filter === 'all'}
            onClick={() => filterBy('all')}
          >
            all
          </FilterButton>
        </div>
        {data.map((c) => (
          <CategorySummary
            key={`category-row-${c.key}`}
            category={c}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
