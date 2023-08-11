import { PureComponent } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ExpenseList from "./Expenses";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ContainerExample() {
  const { loading, error, data } = useQuery(QUERY_ME);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const expenseArr = data.me.expenses;
  const income = data.me.income;
  let monthlyData = [{ name: "Income", cost: income/12, amt: income }];
  let yearlyData = [{name: "Income", cost: income, amt: income}]
  let monthlyTotal =  0
  let yearlyExpenseTotal = 0
  let savingsgoal = data.me.savingsgoal;

  for (let d of expenseArr) {
    const dataPoint = { name: d.name, cost: d.amount, amount: d.amount };
    monthlyData.push(dataPoint);
  }
  for(let e of expenseArr) {
    monthlyTotal += e.amount
  }
  for(let f of expenseArr) {
    const dataPoint = { name: f.name, cost: f.amount*12, amount: f.amount*12};
    yearlyData.push(dataPoint)
    yearlyExpenseTotal += f.amount*12
  }
  monthlyData.push({ name: "Leftover", cost: income/12-monthlyTotal, amount: income/12-monthlyTotal})
  yearlyData.push({name: "Leftover", cost: income-yearlyExpenseTotal, amount: income-yearlyExpenseTotal })
  
  return (
    <Container fluid>
      <Row>
        <Col xs={12} sm={12} md={3}>
          <h1>Expense list</h1>
          <ExpenseList></ExpenseList>
        </Col>

        <Col xs={12} sm={12} md={9}>
          <Container fluid>
            <Row>
              <Col xs={12} sm={12} md={6}>
                <h1> Monthly</h1>
                  <BarChart width={350} height={400} data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="cost" stackId="a" fill="#8884d8" />
                  </BarChart>
              </Col>
              <Col xs={12} sm={12} md={6}>
                <h1> Yearly</h1>
                <BarChart width={350} height={400} data={yearlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="cost" stackId="a" fill="#8884d8" />
                  </BarChart>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <h1>Savings goals</h1>
                <h2>{`In a year you will save $${savingsgoal * 12} if you hit your savings goal each month`}</h2>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default ContainerExample;
