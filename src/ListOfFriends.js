import React from 'react';
import { BrowserRouter, Link, useLocation } from 'react-router-dom';
import './App.css';
import  friend from './friends.json';

const style = {
  ListOfFriends: {
    border: "1px solid grey",
    padding: "10px",
    margin: "15px",
    },
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
  actualFriendDiv: {
    textAlign: "center",
    padding: "5px 0",
    border: "1px solid white",
    background: "white",
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
   const idOfActualFriend = /(?<=-)([\d]+)/.test(pathname)? Number(pathname.match(/(?<=-)([\d]+)/)[0]) :
   0; 
  const dataforuser = Object.entries(friend);  
  const numbersOfFriends =friend[props.loggedUser.id].friends;
    
    const dataOfFriends = numbersOfFriends.map(it=> {return {name: friend[it].name, id: it};});
    
     const idLoggedUser = props.loggedUser.id;
     
    return(
        <div data-testid="ListOfFriends" 
        style={style.ListOfFriends}>
          <div data-testid="choose">Choose with who you'd like to chat :)</div>
          <div
          style={style.allFriends}
          >
          {
          dataOfFriends
          .map(item=>(
            <div key={`/${idLoggedUser}-${item.id}`} 
            style={style.Link}>

              <Link to={`/${idLoggedUser}-${item.id}`}>
              {item.id === idOfActualFriend?
              (<div
              id="link"
              style={style.actualFriendDiv}
              > 
              {item.name}
              </div>)
              :
              (<div
              id="link"
              style={style.individualFriendDiv}
              > 
              {item.name}
              </div>
              )}
              </Link>
            </div>

          ))}
          </div>
        </div>
    );
};

export default ListOfFriends;