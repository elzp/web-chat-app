
import Chat from './Chat';
import LogIn from './LogIn';
import SignIn from './SignIn';
import BigButton from './BigButton';
import FunctionalButton from './FunctionalButton';
import './App.css';
import {useState} from 'react'; 
import {Link} from 'react-router-dom';
import  friends from './friends.json';




function App() {
  const style = {
    Appdiv: Number(sessionStorage.getItem('id')) < 1 ? {
      background: "white",
      margin: "10vw auto auto",
      height: "270px",
      width: "400px",
      border: "1px solid black",
      borderRadius: "5px",
      position: "relative",
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
      minWidth: "70%",
      margin: "0 auto",
      textAlign: "center",
    },
    h1: {
      textAlign: "center",
      margin: "5px",
    },
    welcomeDiv: {
      margin: "0 auto",
    },
    buttonDiv: {
      margin: " 10px auto",
      textAlign: "center",
    },
    logoutButton: {
      display: "inline-block",
      position: "relative",
      top: "10%",
      left: "-30%",
    }
  }
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
    <Link to="/">
      <FunctionalButton 
        style=""
        callbackFunction = {()=>{sessionStorage.setItem('name','');sessionStorage.setItem('id','-1');}}
        textValue = {"Logout"}
      />
    </Link>
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
