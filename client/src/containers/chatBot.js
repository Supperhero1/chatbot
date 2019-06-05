import React, {Component} from "react";
import ChatInput from "../components/chatInput";
import ChatDisplay from "../components/chatDisplay";
import constants from "../resources/constants";

class ChatBot extends Component {
    state={
        chat: [],
    }
    componentDidMount(){
        console.log("test")
        this.addMessageToChat("Hi there! Try typing into the smaller box below to talk to me.", constants.BOT)
        new Audio("http://51.158.187.164:9001/voiceGreeting/?test=1"+Math.random()).play();
    }
    postMessage = async (newMessage)=>{
        console.log("post message: ",newMessage, constants.USER)
        this.addMessageToChat(newMessage, constants.USER);
        let responseFromBot = await this.sendMessageToServer(newMessage)
        console.log("responseFromBot: ",responseFromBot)
        this.addMessageToChat(responseFromBot, constants.BOT)
    }
    addMessageToChat = (newMessageText, newMessageOrigin)=>{
        console.log("adding message to chat: ",newMessageText)
        let chat = this.state.chat;
        if(!newMessageText || !newMessageOrigin ){                      //additional validation required, typechecking and code injection prevention?
            console.log("invalid message parameters");
            return null;
        }
        chat.push(<span className={"chatText textFrom"+newMessageOrigin}>{newMessageText}</span>)
        this.setState({chat: chat})
    }
    sendMessageToServer = async (message) => {
        let response = await fetch('http://51.158.187.164:9001',{
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"chatMessage": message}), 
        })
        .then((res)=>res.json())
        .then((res)=>{console.log("response: ",res.chatBotResponse); return res.chatBotResponse})
        console.log("requesting audio")
        new Audio("http://51.158.187.164:9001/voiceResponse/?test=1"+Math.random()).play();
        return response;
    }
    render(){
        return(
            <div id="chatBot">
                <ChatDisplay chat={this.state.chat} />
                <ChatInput postMessage={this.postMessage}/>
            </div>
        )
    }
}


export default ChatBot;