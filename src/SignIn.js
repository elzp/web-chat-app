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
function SignIn(props) {
    const notValidUser = props.notValidUser;
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [email, setEmail] = useState("");
    const [email2, setEmail2] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const userList = Object.entries(friends).map(it=>{
        const listOfUsers = 
        it[1];
        listOfUsers.id=it[0];
        return listOfUsers;
      }
      )

      const checkIsNewUserDataInDB = ()=>{
        const arrayWithUsernameUsedinDB = userList.filter(it => (it.name === login && it.email === email))
        if (arrayWithUsernameUsedinDB.length<=0) {return false;}
        else {return true}; 
      }

      const validateInput = (data, type)=> {
        switch(type){
          case "password":
            if(password === data){
              setErrorMessage("")
               return  true;
              }
               else{
                setErrorMessage("not even password")
                 return false;
                }
          case "email":
            if(email === data){
              setErrorMessage("")
               return  true;}
              else{
                setErrorMessage("not even email")
                 return false;}
          default:
            return false;
          }
        
      }
      const logOnSubmit = () => {
        
        const newUser ={
        "name": login,
        "pd": password,
        "friends": [],
        "conversations": [],
        }  
        const canBeAdded = !checkIsNewUserDataInDB();
        if(canBeAdded&&errorMessage ===""){
        //axios.post()  or patch call- sending data from form
        //.then(response =>{ 
        //   if(response ==="saved") {
          setLogin("");
          
          setPassword("");
          setPassword2("");
          setEmail("");
          setEmail2("");
        //  }
        // })
        }
      }

    return(
        <div data-testid="LogIn" style={style.friends}>

        <div>
            username:<input 
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
            repeat password:<input 
            value ={password2}
            onChange={(e)=>{
              setPassword2(e.target.value);
              validateInput(e.target.value, "password");
            }}
            />
        </div>
        <div>
            email:<input 
            value ={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            />
        </div>
         
        <div>
        repeat email:<input 
            value ={email2}
            onChange={(e)=>{
              setEmail2(e.target.value);
              validateInput(e.target.value, "email");
            }}
            />
        </div>
        <div>
            <button 
            type="submit" 
            onClick = {logOnSubmit}>log</button>
        </div>
            {errorMessage}

            PASSWORD {password};
            PASSWORD2 {password2};
            email {email};
            email2 {email};
        </div>
 
    );
};

export default SignIn;