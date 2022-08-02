import { Route, Routes } from 'react-router-dom';

import CreateCategory from './features/categories/CreateCategory';
import Dashboard from './features/dashboard/Dashboard';
import CreateItem from './containers/CreateItem';

import DisplaySettings from './containers/DisplaySettings';
import Testing from './containers/Testing';
import TestingItem from './containers/TestingItem';
import EditCategory from './features/categories/EditCategory';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/create" element={<CreateCategory />} />
      <Route path="/category/:key" element={<EditCategory />} />
      <Route path="/category/:key/createItem" element={<CreateItem />} />
      <Route path="/category/:key/createSubCategory" element={<CreateItem />} />
      <Route path="/settings" element={<DisplaySettings />} />
      <Route path="/tests" element={<Testing />} />
      <Route path="/tests/item/:key" element={<TestingItem />} />
    </Routes>
  );
}

export default AppRoutes;
