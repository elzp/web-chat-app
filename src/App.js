
import Chat from './Chat';
import LogIn from './LogIn';
import './App.css';
import {useState} from 'react';
import  friends from './friends.json';

const style = {
  Appdiv:{
    background: "lightgrey",
    //height: "100%",
    padding: "10px 3em",
  },
}


function App() {
  const notValidUser = {name: sessionStorage.getItem('name')|| "", id: sessionStorage.getItem('id')|| "-1"}
  // const notValidUser = {name: "", id: "-1"};
  // const loggedUser = {
  //   name: 'Lucas',
  //   id: "1"
  // };

const [loggedUser, setLoggedUser] = useState(notValidUser);

const output = loggedUser.id <1 ? (
<div>
<h1 data-testid="not-logged">Please, login.</h1>
<LogIn 
setLoggedUser={setLoggedUser} 
notValidUser={notValidUser}
/>
</div>
) : 
    (<div>
    <h1 data-testid="welcome">Welcome to your chat.</h1>
    <Chat loggedUser={loggedUser}/> 
    </div>);

  return (
  <div style={style.Appdiv}>
    {output}

  </div>
    

  );
}

export default App;
