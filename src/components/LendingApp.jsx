import React, { useState } from 'react';
import './LendingApp.css';

function LendingApp() {
  const [amount, setAmount] = useState('');
  const [action, setAction] = useState('borrow'); // Default to borrowing

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleActionChange = (e) => {
    setAction(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can implement the logic to interact with your smart contracts here
    // For simplicity, we'll just log the action and amount for now
    console.log(`Action: ${action}, Amount: ${amount}`);
  };

  return (
    <div>
      <h1>DeFi Borrowing and Lending App</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Action:
            <select value={action} onChange={handleActionChange}>
              <option value="borrow">Borrow</option>
              <option value="lend">Lend</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Amount:
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LendingApp;
