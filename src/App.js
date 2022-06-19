import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { OuterContainer } from './components/Layout';
import CreateCategory from './containers/CreateCategory';
import Dashboard from './containers/Dashboard';
import ManageCategory from './containers/ManageCategory';
import { fetchData } from './store/actions';
import NavbarLink from './components/Navbar/NavbarLink';

function App({ fetch, fetched, hasErrors }) {
  useEffect(() => {
    if (!fetched) {
      fetch();
    }
  }, [fetched]);

  return (
    <OuterContainer>
      {fetched ? (
        <>
          <div className="border-b-2 border-blue-600 dark:border-blue-200 py-2 px-3 w-full flex flex-row justify-between items-center">
            <div className="flex flex-row justify-start items-center">
              <NavbarLink to="/">Dashboard</NavbarLink>
              <NavbarLink to="/create">Create New Category</NavbarLink>
            </div>
            <div>
              {hasErrors ? 'Errors' : 'No errors!'}
            </div>
          </div>
          <div className="w-full flex-1 flex flex-col justify-start items-center overflow-y-scroll">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/create" element={<CreateCategory />} />
              <Route path="/category/:key" element={<ManageCategory />} />
            </Routes>
          </div>
        </>
      ) : (
        <div>Fetching data</div>
      )}
    </OuterContainer>
  );
}

const mapStateToProps = (state) => ({
  fetched: state.data.fetched,
  hasErrors: state.error.hasErrors
});

const mapDispatchToProps = (dispatch) => ({
  fetch: () => dispatch(fetchData())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
