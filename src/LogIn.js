import React, {useState} from 'react';
import './App.css';
import  friends from './friends.json';

const style = {
ListOfFriends:{
    background: "grey",
    width: "100%",
  },
  

}

//
function LogIn(props) {
    const notValidUser = props.notValidUser;
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const userList = Object.entries(friends).map(it=>{
        const listOfUsers = 
        it[1];
        listOfUsers.id=it[0];
        return listOfUsers;
      }
      )

      const checkUser = (log, pass)=>{
        const log2 = userList.filter(it => it.name === log)
        if (log2.length<=0) return notValidUser;
        if (log2.length===1) {
          const notLoggedYet = log2[0].pd === pass ? {name:log2[0].name, id: log2[0].id} : notValidUser;
          return notLoggedYet;
        }
        if (log2.length>1) {
          const filterSameNameUsers = log2.filter(it=> it.pd === pass);
          if( filterSameNameUsers.length <=0) {return notValidUser;
          }else {return {name:filterSameNameUsers[0].name, id: filterSameNameUsers[0].id};}
        }
      }


      const logOnSubmit = () => {
          const newuser = checkUser(login, password);
        props.setLoggedUser(newuser);
        sessionStorage.setItem('name', newuser.name);
        sessionStorage.setItem('id', newuser.id);
        setLogin("");
        setPassword("");
      }

    return(
        <div data-testid="LogIn" style={style.friends}>
            {/* cos {JSON.stringify(checkUser("Lucass", "luc"))}
            cos2 {JSON.stringify(checkUser("Lucas", "Lucas"))}
            cos3 {JSON.stringify(checkUser("Aga", "Aga"))}
 */}

        <div>
            Login:<input 
            value = {login}
            onChange={(e)=>{setLogin(e.target.value)}}
            />
        </div>
        <div>
            Password:<input 
            value ={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            />
        </div>
        <div>
            <button 
            type="submit" 
            onClick = {logOnSubmit}>log</button>
        </div>
            
        </div>
 
    );
};

export default LogIn;