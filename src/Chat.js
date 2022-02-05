
import ListOfFriends from './ListOfFriends';
import ViewOfConv from './ViewOfConv';
// import Comments from './Comments';
// import AddComment from './AddComment';
import './App.css';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import  friends from './friends.json';
import React/*, {useState}*/ from 'react';
import {UsernameContext}  from './Contexts/contexts';
 

const style = {
  Chatdiv:{
    background: "lightgrey",
    //height: "100%",
    padding: "10px 1em",
  },
}

function Chat(props) {

const idLoggedUser = props.loggedUser.id;
  return (
  <div style={style.Chatdiv}>
    <BrowserRouter
    forceRefresh={false}>
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
                loggedUser={props.loggedUser}/>
                </Route>
              )
          return conversationBox;
          
          })
        }
        
     

      </Switch>
     
    {/* {JSON.stringify(props.loggedUser)} */}
    </div>
    )}

   </ UsernameContext.Consumer>
   </BrowserRouter> 
  </div>
    

  );
}

export default Chat;
