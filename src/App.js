
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
// const date = new Date('2021-12-01');
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
    <button type="submit"
    onClick ={()=>{sessionStorage.setItem('name','');sessionStorage.setItem('id','-1');
    window.location.reload(false)}}
    >
      Logout
    </button>
    <Chat loggedUser={loggedUser}/> 
    </div>);

  return (
  <div style={style.Appdiv}>
    {output}
    <div>cos{JSON.stringify(friends)}
    
    {/* {JSON.stringify(date.getFullYear())}-{JSON.stringify(date.getMonth()+1)}-{JSON.stringify(date.getDate())}, {JSON.stringify(date.getHours())}:{JSON.stringify(date.getMinutes())}:{JSON.stringify(date.getSeconds())} */}
    {/* {JSON.stringify(date)} */}
    </div>
  </div>
    

  );
}

export default App;
