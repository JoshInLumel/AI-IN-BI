// Import the OpenAI library
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import ExcelImportService from "./services/excelImportService.js";
import PROMPTS from "./prompts/prompts.js";

// Load environment variables from the .env file
dotenv.config();

// Configure the OpenAI client with your API key
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

// maintain AI context
const responseStack = [];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(
  __dirname,
  "datasets",
  "daily expenses and income.xlsx"
);
// json data from excel data
let jsonData = null;

const promptAI = async ({ systemContent, userContent }) => {
  const messages = [
    {
      role: "system",
      content: systemContent,
    },
    {
      role: "user",
      content: userContent,
    },
  ];

  Array.prototype.push.apply(messages, responseStack);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
    response_format: { type: "json_object" },
  });

  responseStack.push({
    role: "assistant",
    content: response.data.choices[0].message.content,
  });

  // console
  console.log(response.data.choices[0].message.content, "ou@");
};

async function getAndStoreExcelData(filePath) {
  jsonData = ExcelImportService.importExcelAsJsonData(filePath);
}

async function executeAIRequestes(data) {
  for (let p = 0; p < PROMPTS.length; p++) {
    const prompt = PROMPTS[p];

    await promptAI({
      systemContent:
        p == 0
          ? `${prompt.systemContent} consider this as the dataset: ${data}`
          : prompt.systemContent,
      userContent: prompt.userContent,
    });
  }
}

async function main() {
  await getAndStoreExcelData(filePath);
  executeAIRequestes(JSON.stringify(jsonData));
}

main();
