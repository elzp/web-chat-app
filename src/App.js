
import Chat from './Chat';
import './App.css';
// import  friends from './friends.json';

const style = {
  Appdiv:{
    background: "lightgrey",
    //height: "100%",
    padding: "10px 3em",
  },
}

function App() {

const loggedUser = {
  name: 'Lucas',
  id: 1
};

const output = loggedUser.id <1 ? (

<h1 data-testid="not-logged">Please, login.</h1>

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
