import { useFetchCategoryQuery, useFetchDataQuery } from '../services/api';

export default function useRefetchAll({ category, refetch }) {
  const { refetch: refetchDataList } = useFetchDataQuery();
  const refresh = category ? useFetchCategoryQuery(category).refetch : false;
  return () => {
    refetchDataList();
    if (refresh) refresh();
    if (refetch) refetch();
  };
}
