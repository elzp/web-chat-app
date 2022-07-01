import Comments from './Comments';
import AddComment from './AddComment';
import './App.css';
import axios from 'axios';
// import {BrowserRouter, Route, Switch } from 'react-router-dom';
// import  friends from './friends.json';
import React, {useState, useEffect, Suspense } from 'react'
 
function ViewOfConv(props) {
const username = props.username;
const loggedUser = props.loggedUser;
const conversationID = username.id < loggedUser.id ? `${username.id}-${loggedUser.id}` :
`${loggedUser.id}-${username.id}`;
const nameOfFile = `/${conversationID}/conv`;

const [listedElem,  setlistedElem] = useState("[]");
let [newcomment, setNewoment] = useState("");
const setActualConv = props.setActualConv;


const messages =  props.messages;
  

const chandleButtonClick = async (e) => {
  e.preventDefault();
  if(newcomment ==="") return;

   const fullActualDate = new Date();
   const createTwonumberedData = (oneNumberedData) => `${oneNumberedData}`.length ===1? `0${oneNumberedData}`: `${oneNumberedData}`;
   const actualDate = fullActualDate.getFullYear()+'-'+ createTwonumberedData(fullActualDate.getMonth()+1) + '-' + 
   createTwonumberedData(fullActualDate.getDate()) + ', '+ createTwonumberedData(fullActualDate.getHours()) +':' +
   createTwonumberedData(fullActualDate.getMinutes()) + ':' + createTwonumberedData(fullActualDate.getSeconds())

    const messageData = { 
      username: props.loggedUser.name,
      id: loggedUser.id,
      comment: newcomment, 
      time: actualDate,
      channel_id: conversationID,
      };
 
    props.handleSendMessage(messageData)
    setNewoment("");

}



const handleChange = (e, type)=>{
  switch(type){
    case 'comment':
      setNewoment(e.target.value);
      break;
    // case "username":
    //   setNewusername(e.target.value);
    //   break;
    default:
      break;
  }

}
const style = {
    ViewOfConv:{
      background: "lightgrey",
      //height: "100%",
      padding: "10px auto",
      // width: "90%",
      textAlign: "center",
    },
  }
//send to chat.js id of conversation
useEffect(()=>{
  setActualConv(prev=>{
    return {...prev, id: conversationID}})
},[conversationID, setActualConv])

  return (
  <div style={style.ViewOfConv}>
    <Suspense fallback={<div>Comments are loading.</div>}>
   
    <Comments data={listedElem}
     messages = {messages}
     loggedUser={loggedUser}/>
    </Suspense>
    <AddComment 
    changeFnc= {handleChange} 
    buttonClickFnc= {chandleButtonClick}  
    newcomment={newcomment} 
    setlistedElem={setlistedElem}
    isSocketConnected = {props.isSocketConnected}
    loggedUser={props.loggedUser.name} />
 {/* {JSON.stringify(loggedUser)} */}
    
    {/* {messages}
    messages{JSON.stringify(  messages)}; */}
    {/* listedElem type {typeof listedElem}; 
    listedElem - {listedElem} ; */}
  </div>
    

  );
}

export default ViewOfConv;
