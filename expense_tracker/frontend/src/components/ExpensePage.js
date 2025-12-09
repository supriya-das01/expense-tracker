import React, { useEffect, useState } from 'react';
import api from '../api';

function ExpenseForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { title, amount, category, date, description };
    api.post('/expenses/', payload)
      .then(res => {
        onAdd(res.data);
        setTitle(''); setAmount(''); setCategory(''); setDate(''); setDescription('');
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} style={{marginBottom:20}}>
      <input required placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
      <input required type='number' step='0.01' placeholder='Amount' value={amount} onChange={e => setAmount(e.target.value)} />
      <input required placeholder='Category' value={category} onChange={e => setCategory(e.target.value)} />
      <input required type='date' value={date} onChange={e => setDate(e.target.value)} />
      <input placeholder='Description' value={description} onChange={e => setDescription(e.target.value)} />
      <button type='submit'>Add Expense</button>
    </form>
  );
}

function ExpenseList({ expenses }) {
  const total = expenses.reduce((s, e) => s + parseFloat(e.amount), 0);
  return (
    <div>
      <h2>Total: ₹{total.toFixed(2)}</h2>
      <table border='1' cellPadding='8' style={{width:'100%', marginTop:10}}>
        <thead>
          <tr>
            <th>Title</th><th>Amount</th><th>Category</th><th>Date</th><th>Description</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(exp => (
            <tr key={exp.id}>
              <td>{exp.title}</td>
              <td>₹{exp.amount}</td>
              <td>{exp.category}</td>
              <td>{exp.date}</td>
              <td>{exp.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ExpensePage() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = () => {
    api.get('/expenses/')
      .then(res => setExpenses(res.data))
      .catch(err => console.error(err));
  };

  const handleAdd = (expense) => {
    setExpenses(prev => [expense, ...prev]);
  };

  return (
    <div style={{padding:20}}>
      <h1>Expense Tracker</h1>
      <ExpenseForm onAdd={handleAdd} />
      <ExpenseList expenses={expenses} />
    </div>
  );
}
