import { OuterContainer } from './components/Layout';
import NavbarLink from './components/Navbar/NavbarLink';
import { useFetchDataQuery } from './services/api';
import AppRoutes from './AppRoutes';

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
            <AppRoutes />
          </div>
        </>
      ) : (
        <div>Fetching data</div>
      )}
    </OuterContainer>
  );
}

export default App;
