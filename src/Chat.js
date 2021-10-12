
import ListOfFriends from './ListOfFriends';
import ViewOfConv from './ViewOfConv';
// import Comments from './Comments';
// import AddComment from './AddComment';
import './App.css';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import  friends from './friends.json';
import React/*, {useState}*/ from 'react';
import {UsernameContext}  from './Contexts/contexts';
 
function Chat() {
//const [listedElem,  setlistedElem] = useState([]);
// let [newcomment, setNewoment] = useState("");
// let [username, setNewusername] = useState("");
// const listoffriends = Object.values(friends).map(item=>(<div >{item.name}</div>))

// const chandleButtonClick = async (e) => {
//   if(username ==="" & newcomment ==="") return;
//    // const newelement =+ listedElem.length;
//    // const newList = actualElem
//     const newComment = {username: username, comment: newcomment}
//     await setlistedElem(actualElem=> [...actualElem, newComment]);
//     setNewoment("");
//     setNewusername("");

// }

// const handleChange = (e, type)=>{
//   switch(type){
//     case 'comment':
//       setNewoment(e.target.value);
//       break;
//     case "username":
//       setNewusername(e.target.value);
//       break;
//     default:
//       break;
//   }

// }
const style = {
    Chatdiv:{
      background: "lightgrey",
      //height: "100%",
      padding: "10px 3em",
    },
  }
  return (
  <div style={style.Chatdiv}>
    <h1 data-testid="welcome">Choose with who you'd like to chat :)</h1>
    <UsernameContext.Consumer>
    {user=>(
    <div>
      <BrowserRouter> 
        <Switch>

        {Object.entries(friends).map(item=>(
          //trzeba dodać id do nazwy urzytkownika w kontekscie i ustawić tu w path
              <Route path={`/${item[0]}`}>
              <ViewOfConv username ={item[1].name} loggedUser={user}/>
              </Route>
            ))
        }
        
     

      </Switch>
    </BrowserRouter> 
    <ListOfFriends loggedUser={user}/>
    </div>
    )}

   </ UsernameContext.Consumer>
    
  </div>
    

  );
}

export default Chat;
