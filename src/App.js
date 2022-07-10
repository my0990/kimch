import logo from './logo.svg';
import './App.css';
import {Route, Routes } from 'react-router-dom';
import KimchContainer from './components/KimchContainer';
import DisplayContainer from './components/displayContainer';

function App() {

  return (
    <Routes>
      <Route path="/" element={<KimchContainer />} />
      <Route path="/start" element={<DisplayContainer />} />
    </Routes>
  );
}

export default App;
