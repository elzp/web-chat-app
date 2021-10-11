import React from 'react';

const style = {
  commentsection:{background: "grey",
  
  //minWidth: "70%",
  width: "100%",
  },
  userAndComment:{
    display: "flex",
    // "flex-direction": "column",
    borderRadius: "5%",
    border: "1px solid grey",
    padding: "1em",
  },
  user: {
    background: "darkgrey",
    borderRadius: "10%",
    border: "1px solid darkgrey",
    width: "20%",
    height: "fit-content",
    marginRight: "3px",
    padding: "2px 2px",
    textAlign: "left",


  },
  said: {
  fontSize: "0.6em",
  width: "3em",
  
},
  comment: {
    background: "lightgrey",
    border: "1px solid grey",
    width: "80%",
    padding: "2px 2px",
    height: "fit-content",
    wordBreak: "normal",
    "overflow-x": "scroll",


  },

}

function Comments(props) {
  // const g = "1234"
  // cost gg= g.splice(0,2)
    const { data } = props;
    
    const defalutDivForCommentSection = (<div>no one added comments</div>);
    const commentsAfterAddingFirst = ( 
    <div>
        {data?.map((it, indeks)=>(
            <div style={style.userAndComment} key={indeks} data-testid="li">
              <div style={style.user} key={it.username} data-testid="li-user">{it.username} </div>
              <div style={style.said} key={it.said+"said"}>said:</div>
              <div style={style.comment} key={it.comment +'sth'} data-testid="li-comment">{it.comment}</div>
            </div> 
        ))}
        
      </div> )
    const showListOfComments = data.length === 0 ? defalutDivForCommentSection : commentsAfterAddingFirst;
    
    return(
        <div data-testid="Comments" style={style.commentsection}>
            {/* {JSON.stringify( length )} */}
            {showListOfComments}
        </div>
 
    );
};

export default Comments;