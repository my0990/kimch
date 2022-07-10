import logo from './logo.svg';
import './App.css';
import kimch from './media2.gif';
import kimchAudio from './kimchAudio.mp3';
import {useState} from 'react';

function App() {
  const [isClicked,setIsClicked] = useState({kimch});
  return (
    <div className="App">
      <header className="App-header">
        <h1>kimch</h1>
        <button onClick={()=>{setIsClicked( prev => !prev)}}>버튼</button>
        <img src={isClicked ? kimch : null}></img>
      </header>
    </div>
  );
}

export default App;
