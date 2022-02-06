import React from 'react';
import Comment from './Comment';

const style = {
  commentsection:{background: "grey",
  // overflowY: "scroll",
  width: "100%",
  height: "70vh",
  overflowX: "hidden",
  },
}
const loggedUser ={
  userComment:{
    display: "grid",
    gridTemplateAreas: '"name comment" "name time"',
    gridTemplateColumns: "auto 85%",
    borderRadius: "5%",
    border: "1px solid grey",
    padding: ".2em",
    width: "auto",
    marginRight: ".5em",
  },
  time: {
    gridArea: "time",
    fontSize: "0.6em",
    color: "white", 
  },
    comment: {
      gridArea: "comment",
      background: "lightgrey",
      border: "1px solid grey",
      width: "95%",
      padding: "10px 10px",
      height: "fit-content",
      wordBreak: "break-all",
      borderRadius: "10px",
    },
}
const friendUser = {
  userComment:{
    display: "grid",
    gridTemplateAreas: '"comment name" "time name "',
    gridTemplateColumns: "85% auto",
    borderRadius: "5%",
    border: "1px solid grey",
    padding: ".2em",
    width: "auto",
    marginLeft: ".5em",
  },
  time: {
    gridArea: "time",
    fontSize: "0.6em",
    color: "black", 
  },
    comment: {
      gridArea: "comment",
      background: "yellow",
      border: "1px solid grey",
      width: "95%",
      padding: "10px 10px",
      height: "fit-content",
      wordBreak: "break-all",
      borderRadius: "10px",
    },

}

function Comments(props) {
 
    const { data } = props;
    const formatedData = typeof data ==="string"? JSON.parse(data): data;
    const defalutDivForCommentSection = (<div>no one added comments</div>);
    const showListOfComments =  ( 
    <div>
        {formatedData?.map((it)=>(
            <div 
            key={JSON.stringify(it.time)} data-testid="li">
             {
               props.loggedUser.id === it.id ? <Comment childStyle={loggedUser} oneComment={it}/> :
               <Comment childStyle={friendUser} oneComment={it}/>
             }
            </div> 
        ))}
      </div> )
    
    return(
        <div data-testid="Comments" style={style.commentsection}>
      {data === "[]" && defalutDivForCommentSection}
            {showListOfComments}
        </div>
 
    );
};

export default Comments;