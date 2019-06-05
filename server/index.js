require("dotenv").config();
const Assistant = require("ibm-watson/assistant/v1");
const genericSendMessage = require("./commands/commands");
const { IBM } = require("./Accounts/accounts")
const cors=require("cors");
const express = require('express');
const bodyParser=require("body-parser");
const fs = require("fs")
const app=express();
const ms=require("mediaserver");
const {Storage} = require('@google-cloud/storage');

const storage = new Storage({
  projectId: "ai-assistant-project-241213",
  keyFilename: './google_account.json',
});
storage
  .getBuckets()
  .then(results => {
    const buckets = results[0];

    console.log('Buckets:');
    buckets.forEach(bucket => {
      console.log(bucket.name);
    });
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
const assistant = new Assistant(IBM)

const sendMessage = (message)=>genericSendMessage(message, assistant);
app.use(bodyParser.urlencoded({
    extended: true
}));
ms.noCache=true;
app.use(bodyParser.json());
app.use(cors())
app.post('/',async (req, res)=>{
    let respondingMessage;
    let logEntry="----------Message at "+new Date()+" ---------\n";
    logEntry += "Message:\n"+req.body.chatMessage;
    console.log("req.body.chatMessage:\n",req.body.chatMessage);
    if(!req.body.chatMessage){
        console.log("no message in request\n")
    }
    else{
        respondingMessage = await sendMessage(req.body.chatMessage);
        logEntry += "response message:\n"+respondingMessage;
        res.json({chatBotResponse: respondingMessage})
        console.log("\nrespondingMessage: ", respondingMessage)
    }
    fs.appendFile("./logs/logs.txt","\n\n"+logEntry, (err)=>{
        if (err) console.log (err);
        else{
            console.log("log archived sucesfully");
            logs = {};
        }
    })
})
app.get("/voiceResponse/",(req,res)=>{
    ms.pipe(req,res, "./output.mp3");
})

app.get("/voiceGreeting/",(req,res)=>{
  ms.pipe(req,res, "./greeting.mp3");
})
app.listen(9001);
