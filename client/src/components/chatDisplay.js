import React from "react";

const ChatDisplay = (props) => {
    return(
        <div id="chatDisplay">
            {props.chat}
        </div>
    )
}

export default ChatDisplay;