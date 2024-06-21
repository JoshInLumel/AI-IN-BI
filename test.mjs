// Import the OpenAI library
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

// Configure the OpenAI client with your API key
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

async function main() {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: "what is 1+11" }],
  });

  console.log(response.data.choices[0].message);
}

main();
