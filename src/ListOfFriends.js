import React from 'react';
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

   const listoffriends = Object.values(friends).map(item=>(<div >{item.name}</div>))
    
    return(
        <div data-testid="ListOfFriends" style={style.friends}>
     
           {listoffriends}
        </div>
 
    );
};

export default ListOfFriends;