import React from 'react';


function BigButton (props){
    const isChosen = props.chosen === props.type;
    const style = {
        width: "calc(100% - 10px)",
        borderBottom:"2px solid black",
        backgroundColor: isChosen ? "white" : "lightgrey",
        margin: 0,
        padding: "5px",
        borderTopLeftRadius: "login"  === props.type ? "5px": "none",
        borderTopRightRadius: "signin"  === props.type ? "5px": "none",
        textAlign: "center",
    }
    return (
        <>
            <div style={style} onClick={()=>props.changeOfWindows(props.type)}>{props.type}</div>
        </>
    )
}


export default BigButton;