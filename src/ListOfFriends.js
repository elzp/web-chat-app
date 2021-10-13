import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import './App.css';
import  friend from './friends.json';

const style = {
ListOfFriends:{
    background: "grey",
    width: "100%",
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
          <BrowserRouter
              forceRefresh={true}>
          {
          combo
          .map(item=>(
            <div>
              <Link to={`/${idLoggedUser}-${item[1]}`}>
               
              {item[0]}  
              </Link>
            </div>

          ))}
          </BrowserRouter>
          {/* {JSON.stringify(combo)} */}
        </div>
 
    );
};

export default ListOfFriends;