import Comments from './Comments';
import AddComment from './AddComment';
import './App.css';
// import {BrowserRouter, Route, Switch } from 'react-router-dom';
import  friends from './friends.json';
import React, {useState} from 'react'
 
function ViewOfConv(props) {
const [listedElem,  setlistedElem] = useState([]);
let [newcomment, setNewoment] = useState("");
let [username, setNewusername] = useState("");
// const listoffriends = Object.values(friends).map(item=>(<div >{item.name}</div>))

const chandleButtonClick = async (e) => {
  if(username ==="" & newcomment ==="") return;
   // const newelement =+ listedElem.length;
   // const newList = actualElem
    const newComment = {username: username, comment: newcomment}
    await setlistedElem(actualElem=> [...actualElem, newComment]);
    setNewoment("");
    setNewusername("");

}

const handleChange = (e, type)=>{
  switch(type){
    case 'comment':
      setNewoment(e.target.value);
      break;
    case "username":
      setNewusername(e.target.value);
      break;
    default:
      break;
  }

}
const style = {
    ViewOfConv:{
      background: "lightgrey",
      //height: "100%",
      padding: "10px 3em",
    },
  }
  return (
  <div style={style.ViewOfConv}>
   
    <AddComment 
    changeFnc= {handleChange} 
    buttonClickFnc= {chandleButtonClick}  
    newcomment={newcomment} 
    username={props.username} />
    <Comments data={listedElem}/>
  </div>
    

  );
}

export default ViewOfConv;
