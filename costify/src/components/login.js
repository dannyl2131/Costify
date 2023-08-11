import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useMutation } from "@apollo/client";
import {  LOGIN_USER } from "../../src/utils/mutations";
import { useState } from "react";
import auth from "../utils/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser] = useMutation(LOGIN_USER);

  const handleInputChange = (e) => {
    // Getting the value and name of the input which triggered the change
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;
    
    // Based on the input type, we set the state of either email, username, and password
    if (inputType === "email") {
      setEmail(inputValue);
    } else if (inputType === "password") {
      setPassword(inputValue);
    }
  };

  const handleLoginFormSubmit = async (e) => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    e.preventDefault();

    try {
      console.log(typeof(email), typeof(password));
      const mutationResponse = await loginUser({
        variables: { email, password },
      });
      console.log(mutationResponse);
      const token = mutationResponse.data.login.token;
      
      auth.login(token);
      console.log(token);
      // alert(`Hello ${email}`);
    } catch (err) {
      console.log(err);
    }

    // alert(`Hello ${email}`);
  };

  return (
    <Container>
    <Row>
    <Col>
      <Form>
        <Form.Group className="mb-3" controlId="loginemail">
          <Form.Label>Log in</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={handleInputChange}
            name="email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="loginpassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={handleInputChange}
            name="password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
        <Button variant="primary" onClick={handleLoginFormSubmit} type="submit">
          Log-in
        </Button>
      </Form>
    </Col>
    </Row>
    </Container>
  )
}

export default Login;
