import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useMutation } from '@apollo/client';
import { ADD_USER, LOGIN_USER } from '../../src/utils/mutations';
import { useState } from 'react';
import auth from '../utils/auth';


function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [income, setIncome] = useState('');
  const [savingsgoal, setSavingsGoal] = useState('');
  const [password, setPassword] = useState('');
  const [addUser] = useMutation(ADD_USER);
  

  const handleInputChange = (e) => {
    // Getting the value and name of the input which triggered the change
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    // Based on the input type, we set the state of either email, username, and password
    if (inputType === 'email') {
      setEmail(inputValue);
    } else if (inputType === 'userName') {
      setUserName(inputValue);
    }else if (inputType === 'income') {
      setIncome(parseInt(inputValue));
    }else if (inputType === 'savings') {
      setSavingsGoal(parseInt(inputValue));
    } else if (inputType === 'password'){
      setPassword(inputValue);
    }


  };

  const handleSignupFormSubmit = async (e) => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    e.preventDefault();

    try {
      // setUserFormData({email, userName, income, savings, password})
      const mutationResponse = await addUser({
        variables: { username, email, password, savingsgoal, income  }
      })
      const token = mutationResponse.data.addUser.token
      auth.login(token)
      console.log(token)
      alert(`Hello ${username}`);
    }

    catch (err) {
      console.log(err)
    }
    
    
  };

  

  return (
    <Container style={{height: '100vh'}}>

    <Row>

      <Col>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control 
        value={email}
        name='email'
        onChange={handleInputChange} 
        type="email" 
        placeholder="Enter email" />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPlaintext">
        <Form.Label>User Name</Form.Label>
        <Form.Control 
        value={username}
        name='userName'
        onChange={handleInputChange}
        type="text" 
        placeholder="Enter a User Name" />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="Income">
        <Form.Label>Enter your yearly income</Form.Label>
        <Form.Control 
        type="digit"
        value={income}
        name="income"
        onChange={handleInputChange}
        placeholder="Enter Yearly Income" />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="Savings">
        <Form.Label>Enter your monthly savings goal</Form.Label>
        <Form.Control 
        type="digit"
        value={savingsgoal}
        name="savings"
        onChange={handleInputChange}
        placeholder="Enter monthly savings goal" />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        type="password"
        value={password}
        name="password"
        onChange={handleInputChange}
        placeholder="Enter a password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
      </Form.Group>
      <Button 
      variant="primary" 
      type="submit"
      onClick={handleSignupFormSubmit}
      >
        Sign-up
      </Button>
    </Form>
      </Col>

      

    </Row>
    </Container>
  );
}

export default Signup;