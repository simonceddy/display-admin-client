import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import CategoryForm from '../components/Forms/CategoryForm';
import { fetchCategory, setValues } from '../store/actions';

function ManageCategory({ values, fetchData, setVals }) {
  const { key } = useParams();
  useEffect(() => {
    let fetched = false;
    if (!fetched) {
      fetchData(key);
    }
    return () => {
      fetched = true;
    };
  }, []);

  // console.log(values);

  if (!values) return <div>Loading data...</div>;
  // console.log(values);
  return (
    <CategoryForm values={values} setValues={setVals} />
  );
}

const mapStateToProps = (state) => ({
  values: state.forms.createCategory.values
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: (key) => dispatch(fetchCategory(key)),
  setVals: (values) => dispatch(setValues(values))
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageCategory);
