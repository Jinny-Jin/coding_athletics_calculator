import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Calculator from './pages/Main/Main';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Calculator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
