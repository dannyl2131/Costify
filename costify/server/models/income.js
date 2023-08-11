const { Schema, model } = require('mongoose');

const incomeSchema = new Schema({
    income: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    }
});

module.exports = incomeSchema;