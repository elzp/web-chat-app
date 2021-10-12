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
    .filter(it=>it[1].name ===props.loggedUser)[0][1]
    ["friends"]
    
    const namesoffiends = numbersOfFriends
    .map(it=>
      dataforuser[it-1][1]["name"]
      )
    const urlsoffiends = dataforuser
    .filter(it=>it[1].name ===props.loggedUser)[0][1]
    ["conversations"]
     const combo =  namesoffiends.map((it, index)=>[it, urlsoffiends[index]])

     
  
    return(
        <div data-testid="ListOfFriends" style={style.friends}>
          <BrowserRouter
              forceRefresh={true}>
          {//Object.entries(friend)
          combo
          .map(item=>(
            <div>
              <Link to={`/${item[1]}`}>
                {/* item[0]}`}> */}
              {item[0]}  {/*.name} */}
              </Link>
            </div>

          ))}
          </BrowserRouter>
          
        </div>
 
    );
};

export default ListOfFriends;