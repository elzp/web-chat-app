import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'

function App() {
const [listedElem,  setlistedElem] = useState([]);


const chandleButtonClick = (e) => {
  e.preventDefault();
    const newelement =+ listedElem.length;
   // const newList = actualElem
    setlistedElem(actualElem=> [...actualElem, newelement]);

}
  return (
  <div>
    <h1 data-testid="welcome">hello world</h1>
    <div>
      <ul>
        {listedElem.map((it)=>(
          <li key={it} data-testid="li">{it}</li>
        ))}
      </ul>
    </div>
    <button data-testid="add-comment-button"
    onClick = {chandleButtonClick}
    
    >Add</button>
  </div>
    

  );
}

export default App;
