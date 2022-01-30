import React from 'react';

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

function Comments(props) {
 
    const { data } = props;
    const formatedData = typeof data ==="string"? JSON.parse(data): data;
    const defalutDivForCommentSection = (<div>no one added comments</div>);
    const commentsAfterAddingFirst =  ( 
    <div>
        {formatedData?.map((it)=>(
            <div style={style.userAndComment} key={JSON.stringify(it.time)} data-testid="li">
              <div style={style.user} key={(it).username} data-testid="li-user">{it.username} </div>
              <div style={style.time} key={it.time+"said"}>{it.time}</div>
              <div style={style.comment} key={it.comment +'sth'} data-testid="li-comment">{it.comment}</div>
            </div> 
        ))}
      </div> )
    const showListOfComments = formatedData.length === 0 ? defalutDivForCommentSection : commentsAfterAddingFirst;
    
    return(
        <div data-testid="Comments" style={style.commentsection}>
      {/* typeof data? {typeof data}; 
      formateddata type- {typeof formatedData} */}
      {/* formateddata {JSON.stringify([... formatedData])} */}
            {showListOfComments}
        </div>
 
    );
};

export default Comments;