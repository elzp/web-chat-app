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
// const [listedElem2,  setlistedElem2] = useState([]);
let [newcomment, setNewoment] = useState("");
const setActualConv = props.setActualConv;
// const listoffriends = Object.values(friends).map(item=>(<div >{item.name}</div>))

const conversation = props.allConversations===null? 
  [{"channel_id":"1-2","text":"dw","senderName":"Lucas","id":"2022-02-06, 18:40:38"}]
:props.allConversations.filter(it=>it.id===conversationID)

const chandleButtonClick = async (e) => {
  e.preventDefault();
  if(
    //username.name ==="" &
     newcomment ==="") return;
   // const newelement =+ listedElem.length;
   // const newList = actualElem
   const fullActualDate = new Date();
   const createTwonumberedData = (oneNumberedData) => `${oneNumberedData}`.length ===1? `0${oneNumberedData}`: `${oneNumberedData}`;
   const actualDate = fullActualDate.getFullYear()+'-'+ createTwonumberedData(fullActualDate.getMonth()+1) + '-' + 
   createTwonumberedData(fullActualDate.getDate()) + ', '+ createTwonumberedData(fullActualDate.getHours()) +':' +
   createTwonumberedData(fullActualDate.getMinutes()) + ':' + createTwonumberedData(fullActualDate.getSeconds())
  //   const newComment = {
  //     username: props.loggedUser.name, 
  //     id: props.loggedUser.id,
  //     comment: newcomment,
  //     time: actualDate,
  //   }
    
  //   const newdata = [ newComment,  ...JSON.parse(listedElem)]
  //   setlistedElem(actual=>{
  //    // if(typeof actual === "string")  return [ newComment,  ...JSON.parse(actual)]
  //    if(actual ===[]) return [newComment];
  //     if(typeof actual ==="object" )  return JSON.stringify([newComment, ...JSON.parse(actual)])
      
  //   });
  
  //  await  axios.post('http://localhost:3001'+nameOfFile,
  //     { 
  //       messages: newdata
  //     }
  //     )
  //   .then(response=>console.log(response))

    //sending message to backend through socket
    // handleSendMessage() 
    props.handleSendMessage({ channel_id:conversationID, text: newcomment, senderName: props.loggedUser.name, id: actualDate})

    setNewoment("");


    
    // await axios.get('http://localhost:3001'+ nameOfFile)
    //  .then(response=>{
    //    const dataFromResponse = response.data || "[]"
    //    return setlistedElem(dataFromResponse);}) 

}


useEffect(  () =>  {
  // axios.get('http://localhost:3001'+ nameOfFile)
  //    .then(response=>{
  //      const dataFromResponse = response.data || "[]"
  //      return setlistedElem(dataFromResponse);}) 
    
},[nameOfFile]//gets from file saved conversations every time when list of messages is updated in app
);

useEffect(  () =>  { 
  // axios.get('http://localhost:3001'+ nameOfFile)
  //    .then(response=>{
  //      const dataFromResponse = response.data || "[]"
  //      return setlistedElem(dataFromResponse);}) 
    
},[listedElem, nameOfFile]//gets from file saved conversations every time when list of messages is updated in app
);

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
      padding: "10px 0",
    },
  }
  useEffect(()=>{
    setActualConv(prev=>{
      return {...prev, id: conversationID}})
  },[conversationID, setActualConv])
  // useEffect(()=>{setActualConv(preview => { ...preview } )})
  return (
  <div style={style.ViewOfConv}>
    <Suspense fallback={<div>Comments are loading.</div>}>
    <Comments data={listedElem}
     loggedUser={loggedUser}/>
    </Suspense>
    <AddComment 
    changeFnc= {handleChange} 
    buttonClickFnc= {chandleButtonClick}  
    newcomment={newcomment} 
    setlistedElem={setlistedElem}
    loggedUser={props.loggedUser.name} />
    
    {/* {conversation.text.map((it)=>(
        <div>
          {JSON.parse.stringify(it)}

        </div>
      )
    )} */}
    conversation{JSON.stringify(conversation
    // .forEach(it=> {return it.text;})
    )};
    {/* listedElem type {typeof listedElem}; 
    listedElem - {listedElem} ; */}
  </div>
    

  );
}

export default ViewOfConv;
