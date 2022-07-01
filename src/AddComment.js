import React, {useState} from 'react';
const buttonColor="black";
const marginLeft ="5px";
const inputStyle = {
    //marginLeft: marginLeft,
    //marginRight: "5px",
    marginTop: "5px",
    marginBottom: "5px",
    border: "1px white solid",
   // borderRadius: "10%",
   width: "100%",//width: `calc(20% -2*${marginLeft} )`,
}

function AddComment({changeFnc, buttonClickFnc, newcomment, loggedUser,setlistedElem, 
    isSocketConnected 
}) {
    const style={
        input: inputStyle,
        textarea:{
            ...inputStyle,
            resize: "vertical",

        },
        button: {
            background: buttonColor,
            color: "white",
            fontSize: "0.6em",
           // borderRadius: "30%",
            padding: "5px",
            border: buttonColor,
            marginTop: "5px",
            marginBottom: "5px",
            
        },
        error:{
            fontSize: "0.8em",
            color: "white",
            background: "red",
            textAlign: "center",
            alignSelf: "left",
            width: "fit-content",
            padding: "3px " + marginLeft,
            marginLeft: marginLeft,

        },
        AddComment:{
            height: "30vh",
        },
    }
    const placeholders = {comment: 'Add your comment',
    user: 'username for non registered user:'};
    const textOfErrors = {
        empty:"add text to comment", lostConnection: "server is disconnected"
    }
    const [addCommentError, setAddCommentError] = useState({empty:"", lostConnection: ""});
    const [errorIsVisible, setErrorIsVisible] = useState(false);

    const handleclick = (e)=>{
        if(
        newcomment===""){
            setErrorIsVisible(true);
            setAddCommentError(current=> ({...current,empty: textOfErrors.empty}));
            return;} else {
            setAddCommentError(current=>({ ...current, empty: ""}));
            } 
            
        if(isSocketConnected){
            setAddCommentError(current=>({ ...current, lostConnection: ""}));    
             buttonClickFnc(e);
        } else {
            setErrorIsVisible(true);
            setAddCommentError(current =>  ({  ...current, lostConnection: textOfErrors.lostConnection}));    
        }
        
        }

        // useEffect(()=>{
        //     //do when component will unmount
        //        return ()=>{setlistedElem([])}
        // }, [])
        
    return( 
        <div data-testid="AddComment"
        style={style.AddComment}>

    <div>

        {/* Hello {loggedUser} */}
        <textarea 
        style={style.textarea}
        data-testid="comment-input"
        type="text"
        value= {newcomment}
        onChange = {(e)=>changeFnc(e, "comment")}
        placeholder={placeholders?.comment} /> 
    </div>
         

        <button data-testid="add-comment-button"
        style={style.button}
        onClick = {(e)=>handleclick(e)}
        type="button"
        >Add</button>
        {errorIsVisible && 
        <div data-testid="addcomment-error"
        style={style.error}
        >{Object.entries(addCommentError).map(err=>(<p>{err[1]}</p>))}
        
        </div>
        }
        
        </div> 

    );
};

export default AddComment;