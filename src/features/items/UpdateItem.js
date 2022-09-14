/* eslint-disable no-unused-vars */
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import StdButton from '../../components/Interactive/StdButton';
import {
  useFetchCategoryQuery,
  useFetchDataQuery,
  useFetchItemQuery,
  useRemoveItemFromCategoryMutation,
  useUpdateItemMutation
} from '../../services/api';
import getUrl from '../../util/getUrl';
import ItemForm from './ItemForm';

function UpdateItem({ category, subCategory }) {
  const { key, sub, item } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { refetch } = useFetchCategoryQuery(key || category);
  const { refetch: refetchDataList } = useFetchDataQuery();

  const {
    data, isLoading, error, isSuccess: dataLoaded, refetch: refresh
  } = useFetchItemQuery({
    key: key || category,
    sub: sub || subCategory,
    item
  });

  const refetchAll = () => {
    refresh();
    refetch();
    refetchDataList();
  };

  const [removeItem, { isSuccess: isRemoved }] = useRemoveItemFromCategoryMutation();
  const [updateItem, { isSuccess: isUpdated }] = useUpdateItemMutation();
  // const [initialized, setInitialized] = useState(false);
  // const [showMedia, setShowMedia] = useState(null);
  // console.log(data);
  // useEffect(() => {
  //   let formInit = false;
  //   if (!initialized && dataLoaded && !formInit) {
  //     dispatch(initForm({
  //       values: {
  //         title: data.title || '',
  //         body: data.body || ''
  //       },
  //       media: data.media || [],
  //       thumbnail: data.thumbnail || { src: '', alt: '', type: 'image' }
  //     }));
  //     setInitialized(true);
  //   }
  //   return () => {
  //     formInit = true;
  //   };
  // }, [initialized, dataLoaded]);
  if (isLoading) return <div>Loading Data</div>;
  if (error) return <div>{error.message}</div>;

  const doUpdate = async (vals) => {
    // console.log(vals);
    const res = await updateItem({
      ...vals, key, sub, item
    }).unwrap();
    console.log(res);
    refetchAll();
  };

  if (isRemoved) {
    return (
      <div>
        Item removed
        <StdButton onClick={() => navigate('/')}>Done</StdButton>
      </div>
    );
  }
  return (
    <div className="w-11/12">
      {key && (<h2>New Item for {key}{sub && `/${sub}`}</h2>)}
      <ItemForm
        values={data}
        submitLabel="Update Item"
        onSubmit={doUpdate}
        onClose={() => {
          navigate(getUrl(key, sub));
        }}
      />
      <StdButton onClick={async () => {
        await removeItem({ key, sub, item }).unwrap();
        refetchAll();
      }}
      >
        Delete Item
      </StdButton>

    </div>
  );
}

export default UpdateItem;
