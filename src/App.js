
import Chat from './Chat';
import LogIn from './LogIn';
import SignIn from './SignIn';
import BigButton from './BigButton';
import './App.css';
import {useState} from 'react';
import  friends from './friends.json';

const style = {
  Appdiv:{
    background: "lightgrey",
    //height: "100%",
    padding: "10px 3em",
  },
  div :{
    display: "grid",
  gridAutoFlow: "column",
  }
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
const loginDiv = (
  <>
    <h1 data-testid="not-logged">Please, login.</h1>
    <LogIn 
    setLoggedUser={setLoggedUser} 
    notValidUser={notValidUser}
    />
  </>
  );
  const SigninDiv = (
    <>
    <h1 data-testid="not-logged">Of Singn in to app.</h1>
    <SignIn />
    </>
  )
  const [logOrSignDiv,  setLogOrSignDiv] = useState([loginDiv, "login"]);
   const output = loggedUser.id <1 ? logOrSignDiv[0] : 
    (<>
    <h1 data-testid="welcome">Welcome {loggedUser.name} to your chat.</h1>
    <button type="submit"
    onClick ={()=>{sessionStorage.setItem('name','');sessionStorage.setItem('id','-1');
    window.location.reload(false)}}
    >
      Logout
    </button>
    <Chat loggedUser={loggedUser}/> 
    </>);

    const [isUserWantToLog, setIsUserWantToLog] = useState(true);
    const changeOfWindows = (type) => {
        switch(type) {
          case "login":
            setLogOrSignDiv([loginDiv,"login"]);
            break;
          case "signin":
            setLogOrSignDiv([SigninDiv, "signin"]);
            break;
          default:
            break;
        }
    }
  return (
  <div style={style.Appdiv}>
    {loggedUser.id <1 &&
    (<div style={style.div}>
    <BigButton changeOfWindows={changeOfWindows} type={"login"} chosen={logOrSignDiv[1]} />
    <BigButton changeOfWindows={changeOfWindows} type={"signin"} chosen={logOrSignDiv[1]} />
    </div>)}
    {output}
  </div>
    

  );
}

export default App;
