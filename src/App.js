import logo from './logo.svg';
import './App.css';
import {Route, Routes } from 'react-router-dom';
import KimchContainer from './components/KimchContainer';
import DisplayContainer from './components/displayContainer';
import {useState} from 'react';

function App() {
  const [value,setValue] = useState([

  ]);
  return (
    <Routes>
      <Route path="/" element={<KimchContainer value={value} setValue={setValue}/>} />
      <Route path="/start" element={<DisplayContainer value={value}/>} />
    </Routes>
  );
}

export default App;
