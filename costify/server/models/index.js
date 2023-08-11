const users = require('./users');
const income = require('./income');
const { Expense, expenseSchema } = require('./expenses');

module.exports = { users, income, Expense, expenseSchema };