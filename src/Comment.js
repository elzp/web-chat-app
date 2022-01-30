import React from 'react';
const style = {
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
function Comment({oneComment, childStyle }) {

    return(
        <div
        style={childStyle.userComment}>
            {/* <div style={style.user} key={oneComment.username} data-testid="li-user">{oneComment.username} </div> */}
              <div style={childStyle.time} key={oneComment.time+"said"}>{`${oneComment.time}, ${oneComment.username}`}</div>
              <div style={childStyle.comment} key={oneComment.comment +'sth'} data-testid="li-comment">{oneComment.comment}</div>
        </div>

    );
};

export default Comment;