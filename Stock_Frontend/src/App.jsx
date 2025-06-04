import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Screens/Home';
import Stocks from './Screens/Stocks';
import Correlation from './Screens/Correlation';
import './App.css';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/stock' element={<Stocks />} />
        <Route path='/correlation' element={<Correlation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
