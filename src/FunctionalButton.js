import React from 'react';
import {functionalButton} from './functionalButton.style'
function FunctionalButton({buttonStyle, callbackFunction, textValue}) {

    return(
      <>
      <button type="submit"
      style={buttonStyle ?? functionalButton}
      onClick ={()=>{callbackFunction();
      window.location.reload(false)}}
      >
        {textValue}
      </button>
      </>
    );
};

export default FunctionalButton;