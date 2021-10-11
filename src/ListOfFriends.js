import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import './App.css';
import  friends from './friends.json';

const style = {
ListOfFriends:{
    background: "grey",
    width: "100%",
  },
  

}

//
function ListOfFriends(props) {

  //  const listoffriends = Object.values(friends).map(item=>(<div >{item.name}</div>))
    
    return(
        <div data-testid="ListOfFriends" style={style.friends}>
          <BrowserRouter
              forceRefresh={true}>
          {Object.entries(friends).map(item=>(
            <div>
              <Link to={item[0]}>
              {item[1].name}
              </Link>
            </div>

          ))}
          </BrowserRouter>
        </div>
 
    );
};

export default ListOfFriends;