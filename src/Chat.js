
import ListOfFriends from './ListOfFriends';
import ViewOfConv from './ViewOfConv';
// import Comments from './Comments';
// import AddComment from './AddComment';
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
    id: "",
    sockets : [],
    participants: 0,
    messages: [],
  })

  

  const [allConversations, setAllConversations] = useState(null); //channels
  const loadChannels = async () => {
    axios.get('http://localhost:8080/getChannels').then(async response => {
    // console.log("response",response.data)    
    // let data =await  response.data;
    await setAllConversations(response.data);  //this.setState({ channels: data.channels });
    // await console.log("allConversations after fetching", allConversations)
    })
  }
  let socket = socketClient(SERVER);
  const [actualsocket, setActualsocket] = useState(socket);

  useEffect(() => {
    if(allConversations===null){
      loadChannels(); 
    }
  });

  const firstUpdate = useRef(true);
  useEffect(async () => {
    // if(actualConv.id ==="") loadChannels(); 
    if(allConversations!==null) {
      if(firstUpdate.current){//if it's first rendering 

      // console.log(allConversations)
      configureSocket();
      firstUpdate.current = false; // and set firstUpdate=false to not first :)
      return;
      }
    }
  }, [allConversations]);

  const configureSocket = () => {
    socket.on('connection', () => {
      console.log("connection is on", actualConv.id)
        if (actualConv.id!=="") {
            // handleChannelSelect(actualConv.id);
            socket.emit('channel-join', actualConv.id, ack => {});
            console.log("channel-join:", actualConv.id)
        } 
    });
    socket.on('channel', async channel => {
      
      console.log("chanel",channel, "chanel in app", allConversations)
        let channels = allConversations //this.state.channels;
      channels.forEach(c => {
          if (c.id === channel.id) {
              c.participants = channel.participants;
          }
      });
      console.log("channels",channels)
      setAllConversations(channels); //was: this.setState({ channels });
      setActualConv(channel);
      console.log("chanel",channel, "chanel in app after fetch", allConversations)
  });

    socket.on('message', message => {
        console.log("message",message)
        let channels = allConversations;//this.state.channels
        channels.forEach(c => {
            if (c.id === message.channel_id) {
                if (!c.messages) {
                    c.messages = [message];
                } else {
                    c.messages.push(message);
                }
            }
        });
        setAllConversations(allConversations); //was: this.setState({ channels });
    });
    setActualsocket(socket);// this.socket = socket;
}



// handleChannelSelect = id => {
  // let channel = this.state.channels.find(c => {
  //     return c.id === id;
  // });
  
//   this.socket.emit('channel-join', id, ack => {
//   });
// }

const handleSendMessage = (arg) => {
  socket.emit('send-message', arg);// { channel_id:conversationID, text: newcomment, senderName: props.loggedUser.name, id: actualDate}
  console.log('send message to backend')
} // in ViewOfConv

const idLoggedUser = props.loggedUser.id;
  return (
  <div style={style.Chatdiv}>
    {/* <BrowserRouter
    forceRefresh={false}> */}
    <ListOfFriends loggedUser={props.loggedUser}/>
    <UsernameContext.Consumer>
    {user=>(
    <div>
       
        <Switch>

        {Object.entries(friends).map(item=>{
          const conversationBox= (
            //trzeba dodać id do nazwy urzytkownika w kontekscie i ustawić tu w path
                <Route path={`/${idLoggedUser}-${item[0]}`}
                key={`/${idLoggedUser}-${item[0]}`}>
                <ViewOfConv username ={{name:item[1].name, id:item[0]}} 
                allConversations={allConversations}
                setActualConv = {setActualConv}
                actualsocket={actualsocket}
                handleSendMessage={handleSendMessage}
                loggedUser={props.loggedUser}/>
                </Route>
              )
          return conversationBox;
          
          })
        }
        
     

      </Switch>
     
      inChat{JSON.stringify(actualConv)};
      all chats {JSON.stringify(allConversations)};
    </div>
    )}

   </ UsernameContext.Consumer>
   {/* </BrowserRouter>  */}
  </div>
    

  );
}

export default Chat;
