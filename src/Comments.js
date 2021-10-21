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
    overflowX: "scroll",


  },

}

function Comments(props) {
  // const g = "1234"
  // cost gg= g.splice(0,2)
    const { data } = props;
    const formatedData = typeof data ==="string"? JSON.parse(data): data;
    const defalutDivForCommentSection = (<div>no one added comments</div>);
    const commentsAfterAddingFirst =  ( 
    <div>
        {formatedData?.map((it)=>(
            <div style={style.userAndComment} key={JSON.stringify(it.time)} data-testid="li">
              <div style={style.user} key={(it).username} data-testid="li-user">{it.username} </div>
              <div style={style.said} key={it.said+"said"}>{it.time}</div>
              <div style={style.comment} key={it.comment +'sth'} data-testid="li-comment">{it.comment}</div>
            </div> 
        ))}
        {/* error after clicking button Add: 
        index.js:1 Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function. */}
      </div> )
    const showListOfComments = formatedData === [] ? defalutDivForCommentSection : commentsAfterAddingFirst;
    
    return(
        <div data-testid="Comments" style={style.commentsection}>
      typeof data ?{typeof data}
      formateddata type- {typeof formatedData}
      {/* formateddata {JSON.stringify([... formatedData])} */}
            {showListOfComments}
        </div>
 
    );
};

export default Comments;