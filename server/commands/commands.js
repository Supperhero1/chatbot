const { textToSpeech } = require("../text-to-speech/tts")

const genericSendMessage = (userMessage, assistant) => assistant.message({
    workspace_id: process.env.TTS_WORKSPACE,
    input: {"text": userMessage}
})
.then(async res => {
  res= await JSON.stringify(res["output"]["text"][0], null, 2)
  console.log(res);
  return res;
})
.then(async res => {  
  await textToSpeech(res);
  return res;
})
.catch(err => {
  console.log(err)
});

module.exports = genericSendMessage;