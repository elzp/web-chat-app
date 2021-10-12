
import Chat from './Chat';
import './App.css';
// import {BrowserRouter, Route, Switch } from 'react-router-dom';
// import  friends from './friends.json';
import {UsernameContext}  from './Contexts/contexts'


function App() {



const style = {
    Appdiv:{
      background: "lightgrey",
      //height: "100%",
      padding: "10px 3em",
    },
  }
  return (
  <div style={style.Appdiv}>
    <h1 data-testid="welcome">Welcome to your chat.</h1>
    <UsernameContext.Provider value ={
        'Aga2'
        // 'You are not logged in.'
        }>
    <Chat/>
    </UsernameContext.Provider>
 
  </div>
    

  );
}

export default App;
