const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String
    password: String
    income: Int
    expenses: [Expense]
    savingsgoal: Int
    }
    
    type Expense {
        _id: ID!
        name: String!
        amount: Float!
    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        me: User
    }
    type Mutation {
        addUser(username: String!, email: String!, password: String!, income: Int, savingsgoal: Int): Auth
        login(email: String!, password: String!): Auth
        addIncome(amount: Int!, username: String!): User
        addExpense(name: String!, amount: Float!, username: String!): User
        addSavingsGoal(amount: Int!, username: String!): User
        removeExpense(name: String!, username: String!): User
        removeIncome(income: String!, amount: Float!): User
        removeSavingsGoal(savingsgoal: Float!): User
    }
`;

module.exports = typeDefs;

// type Income {
//     _id: ID
//     income: String
//     amount: Float
// }
       