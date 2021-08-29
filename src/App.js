import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'

function App() {
const [listedElem,  setlistedElem] = useState([]);
let [newcomment, setNewoment] = useState("");
const placeholder = "";
const chandleButtonClick = async (e) => {
  e.preventDefault();
  
   // const newelement =+ listedElem.length;
   // const newList = actualElem
    await setlistedElem(actualElem=> [...actualElem, newcomment]);
    setNewoment(placeholder);
}

const handleChange = (e)=>{
  setNewoment(e.target.value);
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
    <input 
    data-testid="comment-input" 
    type="text"
    value= {newcomment}
    onChange = {handleChange}
    placeholder={placeholder} /> 
    <button data-testid="add-comment-button"
    onClick = {chandleButtonClick}
    type="submit"
    
    >Add</button>
  </div>
    

  );
}

export default App;
