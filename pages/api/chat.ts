import { Configuration, OpenAIApi } from "openai";
// import { initialMessages } from "../../components/Form";
// import { type Message } from "../../components/ChatLine";
// break the app if the API key is missing
const fs = require("fs");
if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing Environment Variable OPENAI_API_KEY");
}
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const botName = "AI";
const userName = "News reporter"; // TODO: move to ENV var
// const firstMessge = initialMessages[0].message;
const openai = new OpenAIApi(configuration);

//Generate prompt message
const generatePromptFromMessages = (messages: any) => {
  let prompt = messages[0].message;
  for (let i = 1; i < messages.length; i++) {
    const name = messages[i].who === "user" ? userName : botName;
    prompt += `\n${name}: ${messages[i].message}`;
  }

  return prompt;
};

export default async function handler(req: any, res: any) {
  try {
    console.log(req.body.messages);
    // Add data to the data.json file
    const lastMessage = req.body.messages[req.body.messages.length - 1];
    if (lastMessage.who === "user") {
      await saveToDataJson(lastMessage);
    }
    const messages = req.body.messages;
    const messagesPrompt = generatePromptFromMessages(messages);
    const defaultPrompt = `I am Friendly AI Assistant. \n\nThis is the conversation between AI Bot and a news reporter.\n\n${botName}:${userName}: ${messagesPrompt}\n${botName}: `;
    const finalPrompt = process.env.AI_PROMPT
      ? `${process.env.AI_PROMPT}${messagesPrompt}\n${botName}: `
      : defaultPrompt;
    const payload = {
      model: "text-davinci-003",
      prompt: finalPrompt,
      temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.7,
      max_tokens: process.env.AI_MAX_TOKENS
        ? parseInt(process.env.AI_MAX_TOKENS)
        : 5000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: [`${botName}:`, `${userName}:`],
      user: req.body?.user,
    };
    const response = await openai.createCompletion(payload);
    const firstResponse = response?.data?.choices?.[0]?.text?.trim() ?? "";

    await saveToDataJson({
      message: firstResponse,
      who: "bot",
      time: new Date().toISOString(),
    });
    res.status(200).json({ text: firstResponse });
  } catch (err) {
    console.log(err);
  }
}

// Create a function to write and read data from a data.json file
function saveToDataJson(data: any) {
  console.log(data);
  // Create an empty array to store the data
  let storeData = [];
  // Check if the file exists
  if (fs.existsSync("data/messages.json")) {
    // Read the existing data from the file
    storeData = JSON.parse(fs.readFileSync("data/messages.json", "utf-8"));
  }
  // Push the new data to the existing array
  storeData.push(data);
  // Write the data to the file
  fs.writeFileSync("data/messages.json", JSON.stringify(storeData));
}
