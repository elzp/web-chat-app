import React, {useState} from 'react';
import './App.css';
import  friends from './friends.json';

const style = {
  label:{
      display: "block",
      width: "10em",
    },
  input:{
      height: "1.2em",
  },
  labelAndInputDiv:{
    display: "grid",
    gridTemplateColumns: "10em 10em",
    gridTemplateAreas: "label input",
  },
  error:{
    color:"red",
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
    const [errorMessage, setErrorMessage] = useState({
      password: "",
      email: "",
    });
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

      const validateInput = (data, type, index)=> {
        switch(type){
          case "password":
            if((password === data & index ===2) | (password2 === data & index ===1) //& password2 === data
              ){
              setErrorMessage((previous)=>{
                return {
                ...previous,
                password: "",
                }
              })
               return  true;
              }
               else{
                setErrorMessage((previous)=>{
                  return {
                  ...previous,
                  password: "Your passwords are not the same.",
                  }
                })
                
                 return false;
                }
          case "email":
            if((email === data & index === 2) | (email2 === data & index === 1) //&& email2 === data
              ){
              setErrorMessage((previous)=>{
                return {
                ...previous,
                email: "",
                }
              })
              
               return  true;}
              else{
                setErrorMessage((previous)=>{
                  return {
                  ...previous,
                  email: "Your email adresses are not the same.",
                  }
                })
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

        <div
        style={style.labelAndInputDiv}
        >

            <label
              style={style.label}
              htmlFor = "login"
              >
                username:
            </label>
            <input 
            id = "login"
            style={style.input}
            value = {login}
            onChange={(e)=>{setLogin(e.target.value)}}
            />
        </div>
        <div
        style={style.labelAndInputDiv}
        >
            <label
              style={style.label}
              htmlFor = "password"
              >
                password:
            </label>
            <input 
            id = "password"
            style={style.input}
            value ={password}
            onChange={ async (e) => {
              await setPassword(e.target.value);
              validateInput(e.target.value, "password", 1);
            }}
            />
        </div>
        <div
        style={style.labelAndInputDiv}
        >
            <label
              style={style.label}
              htmlFor = "password2"
              >
                repeat password:
            </label>
            <input 
            id = "password2"
            style={style.input}
            value ={password2}
            onChange={async (e)=>{
              await setPassword2(e.target.value);
              validateInput(e.target.value, "password", 2);
            }}
            />
        </div>
        <div
        style={style.labelAndInputDiv}
        >
            <label
            style={style.label}
            htmlFor = "email"
            >
              email:
            </label> 
            <input 
            id = "email"
            style={style.input}
            value ={email}
            onChange={(e)=>{
              setEmail(e.target.value)
              validateInput(e.target.value, "email", 1);
            }}
            />
        </div>
         
        <div
        style={style.labelAndInputDiv}
        >
          <label
          style={style.label}
          htmlFor = "email2"
          >
            repeat email:
          </label>
        <input 
            id="email2"
            style={style.input}
            value ={email2}
            onChange={(e)=>{
              setEmail2(e.target.value);
              validateInput(e.target.value, "email", 2);
            }}
            />
        </div>
        <div>
        {Object.values(errorMessage).map(it=>(
              <div style={style.error}> 
                {it}
              </div>
            ))}

            <button 
            type="submit" 
            onClick = {logOnSubmit}>sign up</button>
        </div>
        </div>
 
    );
};

export default SignIn;