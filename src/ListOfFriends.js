import React from 'react';
import { BrowserRouter, Link, useLocation } from 'react-router-dom';
import './App.css';
import  friend from './friends.json';

const style = {
  allFriends:{
    marginTop: "2px",
    display: "flex",
    flexFlow: "row wrap",
  },
  individualFriendDiv: {
  // width: "100px",
  textAlign: "center",
  padding: "5px 0",
  border: "1px solid white",
  // borderRight: "1px solid grey",
},
Link: {
  textDecoration: "none",  
    width: "7em",
    // width: "auto",
    color: "black",
    margin: "2px 4px",
  },

}


function ListOfFriends(props) {
  let {pathname} = useLocation();
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
        <div data-testid="ListOfFriends" >
          <div data-testid="choose">Choose with who you'd like to chat :)</div>
          <div
          style={style.allFriends}
          >
          {
          combo
          .map(item=>(
            <div key={`/${idLoggedUser}-${item[1]}`} 
            style={style.Link}>
              <Link to={`/${idLoggedUser}-${item[1]}`}>
              <div
              id="link"
              style={style.individualFriendDiv}
              > 
              {item[0]}  
              </div>
              </Link>
            </div>

          ))}
          </div>
        </div>
    );
};

export default ListOfFriends;