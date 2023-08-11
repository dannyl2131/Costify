const { Schema, model } = require('mongoose');

const expenseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    }
});


const Expense = model('Expense', expenseSchema);

module.exports = { Expense, expenseSchema };
