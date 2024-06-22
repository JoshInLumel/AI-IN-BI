const promptConfig = {
  FLAT_DATA_GENERATION_FROM_EXCEL_PROMPT: {
    systemContent: `Generate a flat configuration for various types of expense category and output the complete configuration in JSON format. Use this data as a sample`,
    userContent: `Each expense is identified by expenseId, with expenseAmount and expenseName as attributes in a list`,
  },
  HIER_DATA_GENERATION_FROM_FLAT_DATA_PROMPT: {
    systemContent: `Generate a hierarchical configuration for the various above expenses and output the complete configuration in JSON format`,
    userContent: `I want to categorize these expenses based on subcategory as individual groups - say taxi, bus come under travel - and for travel, the total expense must be the sum of expenses of its children. Similarly categorize, shaving, mobile cover, slippers, refund into a group, milk, eggs, bread, supermarket, chai, whisky into another group, aryuveda, tulsi plant and medication into another group and so on from the Subcategory column of data given above. Collect subcategories from the 'SubCategory' column of the given data. Each cateory should
    have attributes such as id, expenseName and totalExpense. All atrributes such as totalExpense must have nonZero values. The income of each expense group should be sum of the income of it's sub-expenses
     For the sub-expense of each expense category- each sub expense config must have attributes such
    as expenseId, expenseName and expenseAmount`,
  },
  FINE_TUNE_TO_ADD_INCOME_ATTRIBUTE_FOR_SUB_EXPENSE_PROMPT: {
    systemContent: `Output the complete configuration in JSON format`,
    userContent: `in the above generated data, populate each subexpense of a expense group with income attribute - the value of income attribute can be obtained fromn the Amount column of the given sample data - provided that the Income/Expense column's value should have the value
      Income`,
  },
};

const PROMPTS = [
  promptConfig.FLAT_DATA_GENERATION_FROM_EXCEL_PROMPT,
  promptConfig.HIER_DATA_GENERATION_FROM_FLAT_DATA_PROMPT,
  promptConfig.FINE_TUNE_TO_ADD_INCOME_ATTRIBUTE_FOR_SUB_EXPENSE_PROMPT,
];

module.exports = PROMPTS;
