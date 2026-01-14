  import { useEffect, useState } from 'react';
import { getIncomes } from './services/api';
import Form from './components/Form';
import Table from './components/Table';
import './App.css';

function App() {
  // UseStage
  const [btnRegister, setBtnRegister] = useState(true);
  const [users, setUser] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // UseEffect
  useEffect(() => {
    fetch("http://localhost:8080/users")
    .then(returnU => returnU.json())
    .then(converted_return => setUser(converted_return));

  }, []);

  return (
    <div className="App">
      <div className="container">
        <p>{JSON.stringify(users)}</p>
        <Form button={btnRegister}/>
        <Table />
      </div>
    </div>
  );
  /*
  <ul>
        {incomes.map(income => (
          <li key={income.id}>
            {income.description} - {income.amount}
          </li>
        ))}
      </ul>
  */
}

export default App;