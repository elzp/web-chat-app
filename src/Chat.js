
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
    padding: "10px 3em",
  },
}

function Chat(props) {

const idLoggedUser = props.loggedUser.id;
  return (
  <div style={style.Chatdiv}>
    <h1 data-testid="welcome">Choose with who you'd like to chat :)</h1>
    <UsernameContext.Consumer>
    {user=>(
    <div>
      <BrowserRouter> 
        <Switch>

        {Object.entries(friends).map(item=>{
          const conversationBox= (
            //trzeba dodać id do nazwy urzytkownika w kontekscie i ustawić tu w path
                <Route path={`/${idLoggedUser}-${item[0]}`}>
                <ViewOfConv username ={item[1].name} loggedUser={props.loggedUser}/>
                </Route>
              )
          return conversationBox;
          
          })
        }
        
     

      </Switch>
    </BrowserRouter> 
    <ListOfFriends loggedUser={props.loggedUser}/>
    {/* {JSON.stringify(props.loggedUser)} */}
    </div>
    )}

   </ UsernameContext.Consumer>
    
  </div>
    

  );
}

export default Chat;
