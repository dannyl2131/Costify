import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!, $savingsgoal :Int!, $income: Int!) {
    addUser(username: $username, email: $email, password: $password, savingsgoal: $savingsgoal, income: $income) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_EXPENSE = gql`
mutation Mutation($name: String!, $amount: Float!, $username: String!) {
  addExpense(name: $name, amount: $amount, username: $username) {
    _id
    username
    expenses {
      _id
      name
      amount
    }
  }
}
`;

export const ADD_INCOME = gql`
  mutation addIncome($amount: Int!, $username: String!) {
    addIncome(amount: $amount) {
        user {
          _id
          username
          income
        }
    }
  }
`;

export const REMOVE_EXPENSE = gql`
mutation Mutation($name: String!, $username: String!) {
  removeExpense(name: $name, username: $username) {
    _id
    username
    expenses {
      _id
      name
      amount
    }
  }
}
`;