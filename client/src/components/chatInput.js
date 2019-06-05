import React from "react";

const ChatInput = (props) => {
    return(
        <input 
            id="chatBotInput"
            type="text"
            placeholder="type text here"
            onKeyDown={(event)=>{                       //Check if dangerous code can be passed here, possibly escape message somehow?
                if(event.keyCode===13){
                    props.postMessage(event.target.value);
                    event.target.value="";
                }
            }}
        />
    )
}

export default ChatInput;