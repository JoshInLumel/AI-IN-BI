// Import the OpenAI library
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import ExcelImportService from "./services/excelImportService.js";

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
const filePath = path.resolve(__dirname, "datasets", "expenses1.xlsx");
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
  console.log(response.data.choices[0].message.content);
};

async function getAndStoreExcelData(filePath) {
  const jsonData = ExcelImportService.importExcelAsJsonData(filePath);
  console.log(jsonData, "jh@");
}

async function executeAIRequestes() {
  await promptAI({
    systemContent: `Generate a flat configuration for various types of expenses and output the complete configuration in JSON format`,
    userContent: `Each expense is identified by expenseId, with expenseAmount and expenseName as attributes in a list. Include expenseName options such as 'taxi', 'electricity bill', 'hospital and medication', 'shopping clothes', 'house rent', 'snacks', 'dinner', 'breakfast', 'drinks', 'school fees', 'water tax', and 'insurance'.`,
  });

  promptAI({
    systemContent: `Generate a hierarchical configuration for the various above expenses and output the complete configuration in JSON format`,
    userContent: `I want to categorize these expenses as individual groups - say taxi, bus come under travel - and for travel, the total expense must be the sum of expenses of its children. Similarly categorize, income-tax, electricity bill, house rent into a group, school fees into another group, hospital and medication into another group and so on`,
  });
}

async function main() {
  await getAndStoreExcelData(filePath);
  // executeAIRequestes();
}

main();
