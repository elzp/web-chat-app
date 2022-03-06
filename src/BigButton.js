import React from 'react';


function BigButton (props){
    const style = {
        // width: "50%",
        borderBottom: props.chosen === props.type? "2px solid red": "none",
    }
    return (
        <>
            <div style={style} onClick={()=>props.changeOfWindows(props.type)}>{props.type}</div>
        </>
    )
}


export default BigButton;