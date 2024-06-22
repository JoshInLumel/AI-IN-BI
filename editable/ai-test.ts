// Import the OpenAI library
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
const fs = require("fs");

// Load environment variables from the .env file
dotenv.config();

// Configure the OpenAI client with your API key
const configuration = new Configuration({
  apiKey: "",
});
const openai = new OpenAIApi(configuration);

async function main() {
  const data = `Order ID,Product ID,Customer ID,Product Name,Category,Region,Date of Sale,Quantity Sold,Unit Price,Discount,Shipping Cost,Payment Method,Customer Name,Customer Email,Customer Address
  1001,P123,C456,UltraBoost Running Shoes,Shoes,North America,2023-12-15,2,180.00,0.1,10.00,Credit Card,John Smith,johnsmith@email.com,"123 Main St, Anytown, CA 12345"
  1002,P456,C789,iPhone 15 Pro,Electronics,Europe,2024-01-03,1,1299.00,0.0,15.00,PayPal,Emily Davis,emilydavis@email.com,"456 Elm St, Otherville, NY 54321"
  1003,P789,C456,Levi's 501 Jeans,Clothing,Asia,2024-02-28,3,59.99,0.2,5.00,Debit Card,John Smith,johnsmith@email.com,"123 Main St, Anytown, CA 12345"
  1004,P123,C101,UltraBoost Running Shoes,Shoes,South America,2024-03-10,1,180.00,0.0,8.00,Credit Card,Sarah Johnson,sarahjohnson@email.com,"789 Oak St, New City, TX 75024"
  1005,P234,C789,Sony WH-1000XM5 Headphones,Electronics,North America,2024-04-22,1,349.99,0.15,12.00,PayPal,Emily Davis,emilydavis@email.com,"456 Elm St, Otherville, NY 54321"
  1006,P456,C101,iPhone 15 Pro,Electronics,Asia,2024-05-18,2,1299.00,0.05,20.00,Debit Card,Sarah Johnson,sarahjohnson@email.com,"789 Oak St, New City, TX 75024"`;
  
  const prompt = `Normalization: Carefully design a normalized database schema to house the sales data effectively. Consider tables for orders, products, and potentially more. Efficient Loading: Create a script to load the CSV data into your database. Ensure proper data validation and transformation throughout the process. need response in json format tables query and data in array`;
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: `${data} ${prompt}` }],
  });

  fs.writeFileSync("./organized-data.json", JSON.stringify(response.data.choices[0].message));
}

main();
