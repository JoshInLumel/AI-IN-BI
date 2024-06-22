const formattedData = `

id, name, value, description
z1, travel, 400, travel expenses
z2, food, 200, food expenses
z3. reward, 50, reward expenses
z4, shopping, 150, shopping expenses
z5, salary, 1000, income
z6, bonus, 200, income
z7, refund, 50, income
z8, tax, 30, tax expenses
z10, rent, 200, rent expenses
z11, electricity, 50, electricity expenses
z12, water, 20, water expenses
z13, gas, 30, gas expenses
z14, phone, 30, phone expenses
z15, internet, 20, internet expenses
z16, mobile, 40, mobile expenses



Answer:

{
    id: 'a1,
    name: 'summary',
    formula: 'a2 + a3'
    children : [
        {
            id: 'a2',
            name: 'expenses',
            formula: 'z1 + z2 + z3 + z4 + z8 + z10 + z11 + z12 + z13 + z14 + z15 + z16',
            children:  [
                {
                    id: 'z1',
                    name: 'travel',
                    value: 400,
                    description: 'travel expenses',
                },{
                    id: 'z2',
                    name: 'food',
                    value: 200,
                    description: 'food expenses',
                },{
                    id: 'z3',
                    name: 'reward',
                    value: 50,
                    description: 'reward expenses',
                },{
                    id: 'z4',
                    name: 'shopping',
                    value: 150,
                    description: 'shopping expenses',
                },{
                    id: 'z8',
                    name: 'tax',
                    value: 30,
                    description: 'tax expenses',
                },{
                    id: 'z10',
                    name: 'rent',
                    value: 200,
                    description: 'rent expenses',
                },{
                    id: 'z11',
                    name: 'electricity',
                    value: 50,
                    description: 'electricity expenses',
                },{
                    id: 'z12',
                    name: 'water',
                    value: 20,
                    description: 'water expenses',
                },{
                    id: 'z13',
                    name: 'gas',
                    value: 30,
                    description: 'gas expenses',
                },{
                    id: 'z14',
                    name: 'phone',
                    value: 30,
                    description: 'phone expenses',
                },{
                    id: 'z15',
                    name: 'internet',
                    value: 20,
                    description: 'internet expenses',
                },{
                    id: 'z16',
                    name: 'mobile',
                    value: 40,
                    description: 'mobile expenses',
                }

            ]

        },{
            id: 'a3',
            name: 'income',
            formula: 'z5 + z6 + z7',
            children: [
                {
                    id: 'z5',
                    name: 'salary',
                    value: 1000,
                    description: 'income',
                },
                {
                    id: 'z6',
                    name: 'bonus',
                    value: 200,
                    description: 'income',
                },
                {
                    id: 'z7',
                    name: 'refund',
                    value: 50,
                    description: 'income',
                }
            ]

        }

    ]


}

`;

const promptConfig = {
  FLAT_DATA_GENERATION_FROM_EXCEL_PROMPT: {
    systemContent: `Generate a flat configuration for various types of expense category and output the complete configuration in JSON format. Use this data as a sample`,
    userContent: `Each expense is identified by id, with value and name as attributes in a list`,
  },
  HIER_DATA_GENERATION_FROM_FLAT_DATA_PROMPT: {
    systemContent: `Generate a hierarchical configuration for the various above expenses and output the complete configuration in JSON format`,
    userContent: `I want to categorize these expenses based on subcategory as individual groups - say taxi, bus come under travel - and for travel, the total expense must be the sum of expenses of its children. Similarly categorize, shaving, mobile cover, slippers, refund into a group, milk, eggs, bread, supermarket, chai, whisky into another group, aryuveda, tulsi plant and medication into another group and so on from the Subcategory column of data given above. Collect subcategories from the 'SubCategory' column of the given data. Each cateory should
    have attributes such as id, name and totalExpense. All atrributes such as totalExpense must have nonZero values. The income of each expense group should be sum of the income of it's sub-expenses
     For the sub-expense of each expense category- each sub expense config must have attributes such
    as id, name and value`,
  },
  FINE_TUNE_TO_ADD_INCOME_ATTRIBUTE_FOR_SUB_EXPENSE_PROMPT: {
    systemContent: `Output the complete configuration in JSON format`,
    userContent: `in the above generated data, populate each subexpense of a expense group with income attribute - the value of income attribute can be obtained fromn the Amount column of the given sample data - provided that the Income/Expense column's value should have the value/status as 
      Income in order to retrieve the numerical value from Amount column and assign it as value to the income attribute`,
  },
  FINE_TUNE_REFERENCE: {
    systemContent: `Output the complete configuration in JSON format, fine the above generated data as per this ${formattedData}`,
    userContent: `
     make it as config and subConfig
    `,
  },
};

const PROMPTS = [
  promptConfig.FLAT_DATA_GENERATION_FROM_EXCEL_PROMPT,
  // promptConfig.HIER_DATA_GENERATION_FROM_FLAT_DATA_PROMPT,
  // promptConfig.FINE_TUNE_TO_ADD_INCOME_ATTRIBUTE_FOR_SUB_EXPENSE_PROMPT,
  promptConfig.FINE_TUNE_REFERENCE,
];

module.exports = PROMPTS;
