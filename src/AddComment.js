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

function AddComment({changeFnc, buttonClickFnc, newcomment, loggedUser,setlistedElem }) {
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
    }
    const placeholders = {comment: 'Add your comment',
    user: 'username for non registered user:'};

    const [addCommentError, setAddCommentError] = useState("");
    const [errorIsVisible, setErrorIsVisible] = useState(false);

    const handleclick = (e)=>{
        if(
        newcomment===""){
            setErrorIsVisible(true);
            setAddCommentError("add text to comment");
            return;}

             buttonClickFnc(e);

        
        }

        // useEffect(()=>{
        //     //do when component will unmount
        //        return ()=>{setlistedElem([])}
        // }, [])
        
    return( 
        <div data-testid="AddComment">

    <div>

        {loggedUser}
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
        >{addCommentError}</div>
        }
        
        </div> 

    );
};

export default AddComment;