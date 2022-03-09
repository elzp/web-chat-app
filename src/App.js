
import Chat from './Chat';
import LogIn from './LogIn';
import SignIn from './SignIn';
import BigButton from './BigButton';
import './App.css';
import {useState} from 'react'; 
import  friends from './friends.json';

const style = {
  Appdiv: Number(sessionStorage.getItem('id')) < 1 ? {
    background: "white",
    margin: "10vw auto auto",
    height: "270px",
    width: "400px",
    border: "1px solid black",
    borderRadius: "5px",
  }: {
    background: "lightgrey",
    margin: "10vw auto auto",
    height: "auto",
    width: "auto",
    border: "none",
    borderRadius: "none",
  },
  div :{
    display: "grid",
  gridAutoFlow: "column",
  },
  outputDiv: {
    height: "auto",
    padding: "10px",
    minWidth: "90%",
    margin: "0 auto",
  },
  h1: {
    textAlign: "center",
    margin: "5px",
  },
  buttonDiv: {
    margin: " 10px auto",
    textAlign: "center",
  }
}


function App() {
  const notValidUser = {name: sessionStorage.getItem('name')|| "", id: sessionStorage.getItem('id')|| "-1"}

const [loggedUser, setLoggedUser] = useState(notValidUser);

// const date = new Date('2021-12-01');
const loginDiv = (
  <>
    <h1 data-testid="not-logged"
    style={style.h1}
    >Please, login.</h1>
    <LogIn 
    setLoggedUser={setLoggedUser} 
    notValidUser={notValidUser}
    buttonDiv={style.buttonDiv}
    />
  </>
  );
  const SigninDiv = (
    <>
    <h1 data-testid="not-logged"
    style={style.h1}
    >Please, sign in to app.</h1>
    <SignIn 
    buttonDiv={style.buttonDiv}
    />
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
    <BigButton changeOfWindows={changeOfWindows} type={"login"} chosen={logOrSignDiv[1]} 
      style={"lightgrey"}
    />
    <BigButton changeOfWindows={changeOfWindows} type={"signin"} chosen={logOrSignDiv[1]} 
      background={"lightgrey"}
    />
    </div>)}
    <div style={style.outputDiv}>
    {output}
    {/* {JSON.stringify(Number(sessionStorage.getItem('id')) < 1)} */}
    </div>
  </div>
    

  );
}

export default App;
