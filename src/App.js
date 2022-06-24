import { Route, Routes } from 'react-router-dom';
import { OuterContainer } from './components/Layout';
import CreateCategory from './containers/CreateCategory';
import Dashboard from './containers/Dashboard';
import ManageCategory from './containers/ManageCategory';
import NavbarLink from './components/Navbar/NavbarLink';
import CreateItem from './containers/CreateItem';
import { useFetchDataQuery } from './services/api';
import DisplaySettings from './containers/DisplaySettings';

function App() {
  // TODO this isn't used here beyond preloading
  const { error, isLoading } = useFetchDataQuery();

  return (
    <OuterContainer>
      {!isLoading ? (
        <>
          <div className="border-b-2 border-blue-600 dark:border-blue-200 py-2 px-3 w-full flex flex-row justify-between items-center">
            <div className="flex flex-row justify-start items-center">
              <NavbarLink to="/">Dashboard</NavbarLink>
              <NavbarLink to="/create">Create New Category</NavbarLink>
              <NavbarLink to="/settings">Settings</NavbarLink>
            </div>
            <div>
              {error ? 'Errors' : 'No errors!'}
            </div>
          </div>
          <div className="w-full flex-1 flex flex-col justify-start items-center overflow-y-scroll">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/create" element={<CreateCategory />} />
              <Route path="/category/:key" element={<ManageCategory />} />
              <Route path="/category/:key/createItem" element={<CreateItem />} />
              <Route path="/category/:key/createSubCategory" element={<CreateItem />} />
              <Route path="/settings" element={<DisplaySettings />} />
            </Routes>
          </div>
        </>
      ) : (
        <div>Fetching data</div>
      )}
    </OuterContainer>
  );
}

export default App;
