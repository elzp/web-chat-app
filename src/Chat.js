
import ListOfFriends from './ListOfFriends';
import ViewOfConv from './ViewOfConv';
import FindFriends from "./FindFriends";
import './App.css';
import axios from 'axios';
import {BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';
import  friends from './friends.json';
import React, { useEffect, useState, useRef } from 'react';
import socketClient from 'socket.io-client';
import {UsernameContext}  from './Contexts/contexts';
 
const SERVER = "http://127.0.0.1:8080";
const style = {
  Chatdiv:{
    background: "lightgrey",
    //height: "100%",
    padding: "10px 1em",
  },
}

function Chat(props) {
  const [actualConv, setActualConv] = useState({
    id: "0-0",
    sockets : [],
    participants: 0,
    messages: [],
  })

  const [isConnectionWithSocketServer, SetIsConnectionWithSocketServer] = useState(false);

  const loadChannels = async () => {
    if(actualConv.id === "0-0"){

    }else{
      //if channel isnt default get messages from DB
    await axios.get('http://localhost:3001/'+ actualConv.id + '/conv')
     .then(async (response) => {
       const dataFromResponse = JSON.parse(response.data);
       //set messages from database
       console.log("dataFromResponse", typeof dataFromResponse, dataFromResponse)

      if(dataFromResponse.length !== 0 || actualConv.messages.length === 0) { 
        //not needed saving to messages state if data in DB is empty ([]) 
        if(dataFromResponse.length === 1) { 
          //if in DB is one message then save it in state in app
          await setActualConv(prev=> {return {...prev, messages:[...prev.messages, dataFromResponse]}});
             
         }else{
          await setActualConv(prev=> {return {...prev, messages:[...prev.messages, ...dataFromResponse]}}); 
        }
      console.log("messages in actualConv after fetching", actualConv.messages)
      }
           
     }) 
     .catch()
    } 
  }
  let socket = socketClient(SERVER);
  const [actualsocket, setActualsocket] = useState(socket);

  useEffect(() => {
      console.log("loading past messages")
      async function load() {
        await loadChannels(); 
      }
      load();
  }, [actualConv.id]);

  const firstUpdate = useRef(true);
  useEffect( () => { 
    if(actualConv.id!=="0-0") {
      async function configure() {
        configureSocket();
      }
      if(firstUpdate.current){//if it's first rendering 

        configure();
      firstUpdate.current = false; // and set firstUpdate=false to not first :)
      return;
      }
    }
  }, [actualConv.id]);
  
  const configureSocket = () => {
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
      SetIsConnectionWithSocketServer(false)
    });
    socket.on('connection', () => {
      SetIsConnectionWithSocketServer(true)
      console.log("connection is on", actualConv.id)
        if (actualConv.id!=="") {
            socket.emit('channel-join', actualConv.id, ack => {});
            console.log("channel-join:", actualConv.id)
        } 
    });
    socket.on('channel', async channel => {
 
      console.log("chanel",channel, "chanel in app", actualConv.messages)
        let channels = channel //this.state.channels;
      // channels.forEach(c => {
          if (/*c*/actualConv.id === channels.id) {
              // /*c*/actualConv.participants = channel.participants;
              console.log("actualconv before loading channels from sockets", actualConv.messages)
              channels.messages = actualConv.messages;//not changing actual state of fetched messages
          }
      await setActualConv(prev=>{return {
        ...prev, 
        sockets: channel.sockets, 
        participants: channel.participants
        };
      });
      await console.log( "chanel in app after fetch", actualConv);
  });

    socket.on('message', async message => {
        console.log("message",message)
        // let channels = allConversations;//this.state.channels
        // channels.forEach(c => {
          console.log("new message", message)
          if(message.id !== props.loggedUser.id){ //check if not saving message second time 
                if (!/*c*/actualConv.messages.length <= 0) {
                  /*c*/actualConv.messages = [message];
                } else {
                  console.log("double?")
                  await setActualConv(prev=> {return {...prev, messages:[...prev.messages, message]}});
                  // /*c*/actualConv.messages.push(message);
                } 
          }
    });
    socket.on('error', info => {
      console.log(info)
    })
    setActualsocket(socket);
}

useEffect(()=> {//post if messages changed
  // console.log("is actual messages  empty", actualConv.messages.length === 0, actualConv.messages)
  
    async function postConv(){
      await  axios.post('http://localhost:3001/'+ actualConv.id + '/conv',
        { 
          messages: actualConv.messages
         }
         ).then(response=>console.log("posted in DB", response))
         .catch()
    };
    if(actualConv.messages.length !== 0 //& 
         ){
          postConv(); 
    }
  }
)

const handleSendMessage =async  (arg) => {
  socket.emit('send-message', arg);
  //was { channel_id:conversationID, text: newcomment, senderName: props.loggedUser.name, id: actualDate}
  // is // { username (senderName): props.loggedUser.name, id: loggedUser.id, comment(text): newcomment, time(id): actualDate, channel_id: conversationID,}
  //add new message/comment immiditly to array of actualmessages in app
  console.log('this?')
  await setActualConv(prev=> {return {...prev, messages:[...prev.messages, arg]}}); 
  // send new message/comment to save in database

  console.log('send message to backend')
} // in ViewOfConv

const idLoggedUser = props.loggedUser.id;
  return (
  <div id="chatDiv" style={style.Chatdiv}>
    <ListOfFriends loggedUser={props.loggedUser}/>
    <FindFriends 
    loggedUser={props.loggedUser}
    />
    

    <UsernameContext.Consumer>
    {user=>(
    <div>
       
        <Switch>

        {Object.entries(friends).map(item=>{
          const conversationBox= (
                <Route path={`/${idLoggedUser}-${item[0]}`}
                key={`/${idLoggedUser}-${item[0]}`}>
                <ViewOfConv username ={{name:item[1].name, id:item[0]}} 
                messages={actualConv.messages}
                setActualConv = {setActualConv}
                actualsocket={actualsocket}
                handleSendMessage={handleSendMessage}
                loggedUser={props.loggedUser}
                isSocketConnected = {isConnectionWithSocketServer}/>
                
                </Route>
              )
          return conversationBox;
          
          })
        }
        
     

      </Switch>
    </div>
    )}

   </ UsernameContext.Consumer>

  </div>
    

  );
}

export default Chat;
