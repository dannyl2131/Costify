import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_EXPENSE } from "../../src/utils/mutations";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import auth from "../utils/auth";

function NewExpense() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [addExpense, { error, data }] = useMutation(ADD_EXPENSE);

  const handleInputChange = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    if (inputType === "name") {
      setName(inputValue);
    } else if (inputType === "amount") {
      setAmount(parseFloat(inputValue));
    }
  };

  const handleFormSubmit = async (e) => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    e.preventDefault();

    const userFind = await auth.getProfile();
    const username = userFind.data.username;
    
    try {
      console.log(userFind.data.username);
      console.log(username);
      console.log(name, amount, username);
      const mutationResponse = await addExpense({
        variables: { username, name, amount },
      });
      console.log(mutationResponse);
    } catch (err) {
      console.log(err);
    }

    setName("");
    setAmount("");
    alert(`${name} amount is ${amount}`);
    // window.location.reload();
  };

  return (
    <>
    <Container>
      <Row>
        <Col>
      <Form>
        <InputGroup className="mb-3">
          <InputGroup.Text>Expense name:</InputGroup.Text>
          <Form.Control
            aria-label="text"
            name="name"
            onChange={handleInputChange}
            value={name}
          />
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control
            aria-label="Dollar amount (with dot and two decimal places)"
            name="amount"
            onChange={handleInputChange}
            value={amount}
          />
        </InputGroup>
        <Button
          variant="primary"
          type="submit"
          onClick={handleFormSubmit}
        >
          Add expense
        </Button>
      </Form>
      </Col>
      </Row>
      </Container> 
    </>
  );
}

export default NewExpense;
