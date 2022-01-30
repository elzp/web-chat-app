import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import './App.css';
import  friend from './friends.json';

const style = {
ListOfFriends:{
    background: "grey",
    width: "100%",
  },
FriendDiv: {
  width: "100px",
  textAlign: "center",
  padding: "5px 0",
  borderLeft: "1px solid grey",
},
Link: {
  "text-decoration": "none",  
  width: "100px",
  color: "black",
  },

}

//
function ListOfFriends(props) {

  //  const listoffriends = Object.values(friends).map(item=>(<div >{item.name}</div>))
  const dataforuser = Object.entries(friend);  
  const numbersOfFriends = dataforuser
    .filter(it=>it[1].name ===props.loggedUser.name)[0][1]
    ["friends"]
    
    const namesoffiends = numbersOfFriends
    .map(it=>
      dataforuser[it-1][1]["name"]
      )
    const urlsoffiends = dataforuser
    .filter(it=>it[1].name ===props.loggedUser.name)[0][1]
    ["conversations"]
     const combo =  namesoffiends.map((it, index)=>[it,numbersOfFriends[index], urlsoffiends[index]]);
     const idLoggedUser = props.loggedUser.id;
     
  
    return(
        <div data-testid="ListOfFriends" style={style.friends}>
          <div data-testid="choose">Choose with who you'd like to chat :)</div>
          <BrowserRouter
              forceRefresh={true}>
          {
          combo
          .map(item=>(
            <div key={`/${idLoggedUser}-${item[1]}`} 
            style={style.Link}>
              <Link to={`/${idLoggedUser}-${item[1]}`}>
              <div
              id="link"
              style={style.FriendDiv}
              > 
              {item[0]}  
              </div>
              </Link>
            </div>

          ))}
          </BrowserRouter>
          {/* {JSON.stringify(combo)} */}
        </div>
 
    );
};

export default ListOfFriends;