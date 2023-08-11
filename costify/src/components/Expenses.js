import { ListGroup, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_EXPENSE } from '../utils/mutations';
import auth from "../utils/auth";

const ExpenseList = () => {
  const [removeExpense, { err }] = useMutation(REMOVE_EXPENSE);
  const { loading, error, data } = useQuery(QUERY_ME);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const expenseArr = data.me.expenses;

  const handleDeleteExpense = async (name) => {
    const token = auth.getProfile();
    const username = token.data.username
    const { data } = await removeExpense({
      variables: { name, username },
    });
  }

  let expenses = []
    for(let d of expenseArr) {
      let expense = <ListGroup.Item>
        {`${d.name}: $${d.amount}`}
        <Button
        variant="secondary"
        style={{float: 'right'}}
        onClick={() => handleDeleteExpense(d.name)}
        >Delete</Button>
      </ListGroup.Item>
      expenses.push(expense);
    }

  return (
    <ListGroup>
      {expenses}
    </ListGroup>
  );
}

export default ExpenseList;