import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { OuterContainer } from './components/Layout';
import NavbarLink from './components/Navbar/NavbarLink';
import { useFetchDataQuery } from './services/api';
import AppRoutes from './AppRoutes';
import Notifications from './features/notifications/Notifications';
import { addNotification } from './features/notifications/notificationsSlice';
import NavbarAnchor from './components/Navbar/NavbarAnchor';
import { NOTIFY_ERROR } from './features/notifications/support';
import getManifest from './util/getManifest';

// const worker = new Worker('./worker.js');
// console.log(worker);
getManifest()
  .then((data) => {
    document.getElementsByTagName('title')[0].innerHTML = data.title || 'Wonthaggi & District Historical Society';
  });

function App() {
  // TODO this isn't used here beyond preloading
  const { error, isLoading } = useFetchDataQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      dispatch(addNotification({
        message: error.message,
        type: NOTIFY_ERROR
      }));
    }
  }, [error]);

  return (
    <OuterContainer>
      {!isLoading ? (
        <>
          <Notifications />
          <div className="border-b-2 border-blue-600 dark:border-blue-200 py-2 px-3 w-full flex flex-row justify-between items-center">
            <div className="flex flex-row justify-start items-center">
              <NavbarLink to="/">Dashboard</NavbarLink>
              <NavbarLink to="/create">Create New Category</NavbarLink>
              <NavbarLink to="/settings">Settings</NavbarLink>
              <NavbarAnchor to="http://localhost:3030/">
                Client
              </NavbarAnchor>
            </div>
          </div>
          <div className="w-full flex-1 flex flex-col justify-start items-center overflow-y-scroll relative">
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
