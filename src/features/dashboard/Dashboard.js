/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux';
import FilterButton from '../../components/Interactive/FilterButton';
import { useArchiveCategoryMutation, useFetchDataQuery, useUnarchiveCategoryMutation } from '../../services/api';
import CategorySummary from '../../containers/CategorySummary';
import {
  FILTER_ARCHIVED, FILTER_CURRENT, FILTER_NONE, FILTER_UNPUBLISHED, setFilter
} from './dashboardSlice';

function filterData(filterBy = FILTER_NONE, data = []) {
  switch (filterBy) {
    case FILTER_ARCHIVED:
      return data.filter((v) => v.archived === true);
    case FILTER_UNPUBLISHED:
      return data.filter((v) => v.published === false);
    case FILTER_CURRENT:
      return data.filter((v) => v.archived === false && v.published !== false);
    default:
      return data;
  }
}

function Dashboard({ filter }) {
  const {
    data, error, isLoading, refetch
  } = useFetchDataQuery();
  const [archiveCategory, { isLoading: archiving }] = useArchiveCategoryMutation();
  const [unarchiveCategory, { isLoading: unarchiving }] = useUnarchiveCategoryMutation();
  const { filterBy } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  if (isLoading) return <div>loading...</div>;

  const dataList = filterData(filterBy, data);
  // console.log(data);
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
            disabled={filterBy === FILTER_CURRENT}
            onClick={() => dispatch(setFilter(FILTER_CURRENT))}
          >
            Current
          </FilterButton>
          <FilterButton
            disabled={filterBy === FILTER_ARCHIVED}
            onClick={() => dispatch(setFilter(FILTER_ARCHIVED))}
          >
            archived
          </FilterButton>
          <FilterButton
            disabled={filterBy === FILTER_UNPUBLISHED}
            onClick={() => dispatch(setFilter(FILTER_UNPUBLISHED))}
          >
            unpublished
          </FilterButton>
          <FilterButton
            disabled={filterBy === FILTER_NONE}
            onClick={() => dispatch(setFilter(FILTER_NONE))}
          >
            all
          </FilterButton>
        </div>
        {dataList.map((c) => (
          <CategorySummary
            key={`category-row-${c.key}`}
            category={c}
            handleArchive={async () => {
              if (c.archived) {
                await unarchiveCategory(c.key).unwrap();
              } else {
                await archiveCategory(c.key).unwrap();
              }
              refetch();
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
