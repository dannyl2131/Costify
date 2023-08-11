const { AuthenticationError } = require('apollo-server-express');
const { users, income, Expense, expenseSchema } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // // users: async () => {
        // //     return users.find().populate('expenses').populate('income');
        // // },
        // user: async (parent, { username }) => {
        //     return users.findOne({ username }).populate('expenses').populate('income');
        // },
        // expenses: async (parent, { username }) => {
        //     const params = username ? { username } : {};
        //     return expenses.find(params).sort({ createdAt: -1 });

        // },
        // expense: async (parent, { _id }) => {
        //     return expenses.findOne({ _id });


        // },
        // income: async (parent, { username }) => {
        //     const params = username ? { username } : {};
        //     return income.find(params).sort({ createdAt: -1 });


        // },
        // income: async (parent, { _id }) => {

        //     return income.findOne({ _id });


        // },
        // me: async (parent, { username }) => {
        //     return users.findOne({ username });
        // },
        me: async (parent, args, context) => {
            if (context.user) {
              return users.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
          },
    },
    Mutation: {
        addUser: async (parent, { username, email, password, income, savingsgoal }) => {
            const user = await users.create({ username, email, password, income, savingsgoal });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await users.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No profile with this email found!');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password!');
            }

            const token = signToken(user);
            return { token, user };
        },
        addExpense: async (parent, { name, amount, username }, context) => {
            if (true) {
                const expense = await Expense.create({
                    name,
                    amount,
                    username
                });

                const newExpense = await Expense.findOne({ name });

                const user = await users.findOneAndUpdate(
                    { username: username },
                    { $addToSet: { expenses: newExpense } }
                );

                return user;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        addIncome: async (parent, { amount, username }, context) => {
            if (true) {
                const income = await users.findOneAndUpdate(
                    { username: username },
                    { $set: { income: amount } },
                    { new: true }
                );

                return income;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        addSavingsGoal: async (parent, { amount, username }, context) => {
            if (true) {
                const savingsgoal = await users.findOneAndUpdate(
                    { username: username },
                    { $set: { savingsgoal: amount }},
                    { new: true }
                );

                return savingsgoal;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        removeExpense: async (parent, { name, username }, context) => {
            if (true) {
                const expense = await Expense.findOneAndDelete({ name });

                const user = await users.findOneAndUpdate(
                    { username: username },
                    { $pull: { expenses: {name: name} } },
                    { new: true }
                );

                return user;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        removeIncome: async (parent, { income, amount }, context) => {
            if (context.user) {
                const income = await income.findOneAndDelete({
                    income,
                    amount,
                    username: context.user.username,
                });

                await users.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { income: income._id } }
                );

                return income;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        removeSavingsGoal: async (parent, { savingsgoal }, context) => {
            if (context.user) {
                const savingsgoal = await savingsgoal.findOneAndDelete({
                    savingsgoal,
                    username: context.user.username,
                });

                await users.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savingsgoal: savingsgoal._id } }
                );

                return savingsgoal;
            }

            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;
