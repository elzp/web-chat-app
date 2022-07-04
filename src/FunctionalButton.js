import React from 'react';

function FunctionalButton({buttonStyle, callbackFunction, textValue}) {

    return(
      <>
      <button type="submit"
      style={buttonStyle}
      onClick ={()=>{callbackFunction();
      window.location.reload(false)}}
      >
        {textValue}
      </button>
      </>
    );
};

export default FunctionalButton;