import React, {useState} from 'react';
import axios from 'axios';
// import { BrowserRouter, Link } from 'react-router-dom';
import './App.css';
import  friend from './friends.json';

const style = {
FindFriends:{
    background: "grey",
    width: "100%",
  },
friend: {
  // border: "1px solid gray",
  width: "7em",
  // overflow: "hidden",
  display: "grid",
  gridAutoFlow: "column",
},
friendName: {
  width: "4em",
  margin: "0",
  marginLeft: "2px",
  textAlign: "left", 
},
buttonDiv:{
  width: "2em",
  margin: "0", 
},
button: {
  width: "2em",
}
}

//
function FindFriends(props) {
  const loggedId = props.loggedUser.id;
  //  const listoffriends = Object.values(friends).map(item=>(<div >{item.name}</div>))
  const dataforuser = Object.entries(friend);  
  let numbersOfFriends = [...(dataforuser
    .filter(it=>it[1].name === props.loggedUser.name)[0][1]
    ["friends"]), Number(loggedId)]
    const idsofNotFriends = dataforuser.map(it => Number(it[0])).filter(it=>numbersOfFriends.every(it1=>it1!==it))
        //numberOFriend =>dataforuser.filter(it=>it[0]!==numberOFriend))
    
    const dataAboutNotFriends = dataforuser
    .map((it, id)=>{return { name: it[1]["name"], id: id + 1 }}) // {name, number of friend}
     .filter((it, id)=>//
     idsofNotFriends.some(it1=>it1===it.id))

     const idLoggedUser = loggedId;
     
     const [searchInput, setSearchInput] = useState("");
     const [listOfDisplayedFriendToChoose, setListOfDisplayedFriendToChoose] = useState([]);
     
     const changeResultsOfSearch = (e)=> {
          const inputText = e.target.value 
          setSearchInput(e.target.value)
          
          const regEx = new RegExp(inputText,'i')
          const dataOfFriendsToChoose = dataAboutNotFriends
          .map(it => {return {shoudBeDisplayed: regEx.test(it.name), id: it.id, name: it.name};})
          .filter(it=>it.shoudBeDisplayed===true)
          console.log("dataAboutNotFriends", dataAboutNotFriends)
          console.log("dataOfFriendsToChoose", dataOfFriendsToChoose)

          if (inputText==="") {
            setListOfDisplayedFriendToChoose([])
          }
          else {
          setListOfDisplayedFriendToChoose(dataOfFriendsToChoose)
        }
     }

    const addFriend = (idOfLoggedUser, friendId) => {
      axios.post(`http://localhost:3001/add-friend/${idOfLoggedUser}`,
      {
        friendId: Number(friendId),
      }).then(()=>{
        const upadatedFriendsToChoose = listOfDisplayedFriendToChoose.filter(it=> it.id!==friendId);
        console.log("updated", upadatedFriendsToChoose)
        setListOfDisplayedFriendToChoose(upadatedFriendsToChoose)
      })
    }
    return(
        <div data-testid="FindFriends" style={style.friends}>
          <label htmlFor="searchinput">
              search new friend.
            </label>
            <input 
            id="for"
            value = {searchInput}
            onChange={(e)=>changeResultsOfSearch(e)}
            />

          {
          listOfDisplayedFriendToChoose
          .map(item=>(
            <div key={`/${idLoggedUser}-${item.id}`}
              style={style.friend}
            > 
              <div style={style.buttonDiv}>
              <button
                style={style.button}
                onClick={()=>addFriend(idLoggedUser, item.id)}
              >+</button>
              </div>
              <div
              style={style.friendName}
              >
              {item.name}
              </div>
              <div>
              {/* {JSON.stringify(dataOfFriendsToChoose)} */}
              </div>
            </div>

          ))}
        </div>
 
    );
};

export default FindFriends;