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

const responseStack = [];

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

  console.log(messages, "mes@");

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

async function main() {
  await promptAI({
    systemContent: `Generate a flat configuration for various types of expenses and output the complete configuration in JSON format`,
    userContent: `Each expense is identified by expenseId, with expenseAmount and expenseName as attributes in a list. Include expenseName options such as 'taxi', 'electricity bill', 'hospital and medication', 'shopping clothes', 'house rent', 'snacks', 'dinner', 'breakfast', 'drinks', 'school fees', 'water tax', and 'insurance'.`,
  });

  promptAI({
    systemContent: `Generate a hierarchical configuration for the various above expenses and output the complete configuration in JSON format`,
    userContent: `I want to categorize these expenses as individual groups - say taxi, bus come under travel - and for travel, the total expense must be the sum of expenses of its children. Similarly categorize, income-tax, electricity bill, house rent into a group, school fees into another group, hospital and medication into another group and so on`,
  });
}

main();

/**
 * test:
 * content:
 * We are given a configuration array like this: [{id:'1', label:'Jan'},{id:'2', label:'Feb'},{id:'3', label:'Mar'}]. Each id is unique and the labels follow the months of the year. What will the fourth configuration be? Output the whole config with the requested config in json format.
 *
 * transaction:
 * content:
 * Group of people: Jeeva, Manoj & Josh
 * Day Expense:
 * Breakfast -  Jeeva paid 200 for the group
 * Lunch - Manoj paid 500 for the group
 * Dinner - Josh - 300 paid for the group
 * give me this data: - who are all the people involved in the transaction - how much did each person spend and how much does each person
 * owe to other person
 * 
 * 
 *    // content:
        //   "We are given a configuration array like this: [{id:'1', label:'Jan'},{id:'2', label:'Feb'},{id:'3', label:'Mar'}]. Each id is unique and the labels follow the months of the year. What will the fourth configuration be? Output the whole config with the requested config in json format.",
        // content: `
        // Group of people: Jeeva, Manoj, and Josh
        // Day's Expenses:

        // For Monday:
        //   - Breakfast: Jeeva paid 200 for the group
        //   - Lunch: Manoj paid 500 for the group
        //   - Dinner: Josh paid 300 for the group

        // For Tuesday:
        //   - Breakfast - Josh paid 200 for himself and Manoj
        //   - Snacks - Josh paid 100 for himself

        // Please provide the following information in json format:
        //   - List of all people involved in the transaction
        //   - How much each person spent
        //   - How much each person owes to the other person for each day
        //   - categorize each transaction day wise

        // `,
 */

const testData = [
  { id: "1", expenseName: "Taxi", expenseAmount: 200 },
  { id: "2", expenseName: "Bus", expenseAmount: 20 },
  {
    id: "8",
    expenseName: "House Rent",
    expenseAmount: 20000,
  },
  { id: "3", expenseName: "Breakfast", expenseAmount: 150 },
  { id: "4", expenseName: "Dinner", expenseAmount: 400 },
  {
    id: "5",
    expenseName: "Electricity Bill",
    expenseAmount: 300,
  },
  {
    id: "200",
    expenseName: "Hospital charges and medication",
    expenseAmount: 40000,
  },
  {
    id: "6",
    expenseName: "Water Tax",
    expenseAmount: 200,
  },
  {
    id: "7",
    expenseName: "Telephone Bill",
    expenseAmount: 500,
  },
  {
    id: "10",
    expenseName: "Shopping Clothes",
    expenseAmount: 90000,
  },
];
