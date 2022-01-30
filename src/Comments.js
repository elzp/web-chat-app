import React from 'react';
import Comment from './Comment';

const style = {
  commentsection:{background: "grey",
  overflowY: "scroll",
  width: "100%",
  height: "70vh",
  },
  userAndComment:{
    display: "grid",
    "grid-template-areas": '"name comment" "name time"',
    "grid-template-columns": "auto 85%",
    borderRadius: "5%",
    border: "1px solid grey",
    padding: "1em",
    width: "auto",
  },
  user: {
    "grid-area": "name",
    background: "lightgrey",
    borderRadius: "10px",
    border: "1px solid darkgrey",
    height: "fit-content",
    marginRight: "3px",
    padding: "2px 10px 2px",
    textAlign: "right",
    wordBreak: "break-all",


  },
  time: {
  "grid-area": "time",
  fontSize: "0.6em",
  color: "white",
  
},
  comment: {
    "grid-area": "comment",
    background: "lightgrey",
    border: "1px solid grey",
    width: "95%",
    padding: "10px 10px",
    height: "fit-content",
    wordBreak: "break-all",
    "border-radius": "10px",


  },

}

const loggedUser ={
}
const friendUser = {
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
             <Comment oneComment={it}/>
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