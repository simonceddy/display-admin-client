import { Route, Routes } from 'react-router-dom';
import { OuterContainer } from './components/Layout';
import DisplaySummary from './containers/DisplaySummary';
import ManageCategory from './containers/ManageCategory';

function App() {
  return (
    <OuterContainer>
      <Routes>
        <Route path="/" element={<DisplaySummary />} />
        <Route path="/create" element={<ManageCategory />} />
      </Routes>
    </OuterContainer>
  );
}

export default App;
