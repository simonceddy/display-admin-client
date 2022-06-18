import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { OuterContainer } from './components/Layout';
import DisplaySummary from './containers/DisplaySummary';
import ManageCategory from './containers/ManageCategory';
import { fetchData } from './store/actions';

function App({ data, fetch, fetched }) {
  useEffect(() => {
    if (!fetched) {
      fetch();
    }
  }, [fetched]);

  return (
    <OuterContainer>
      {fetched ? (
        <Routes>
          <Route path="/" element={<DisplaySummary data={data} />} />
          <Route path="/create" element={<ManageCategory />} />
        </Routes>
      ) : (
        <div>Fetching data</div>
      )}
    </OuterContainer>
  );
}

const mapStateToProps = (state) => ({
  data: state.data.all,
  fetched: state.data.fetched,
});

const mapDispatchToProps = (dispatch) => ({
  fetch: () => dispatch(fetchData())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
