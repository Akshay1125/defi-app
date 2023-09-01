import React, { useState } from 'react';
import ConnectWallet from './ConnectWallet';
import ViewBalance from './ViewBalance';
import BorrowAsset from './BorrowAsset';
import LendAsset from './LendAsset';

function App() {
  const [wallet, setWallet] = useState(null); // State to store the wallet instance
  const [borrowedAmount, setBorrowedAmount] = useState(0);
  const [lentAmount, setLentAmount] = useState(0);

  // Function to handle borrowing
  const handleBorrow = (amount) => {
    // Calculate and update the new borrowed amount (add the borrowed amount to the previous borrowed amount)
    const newBorrowedAmount = borrowedAmount + amount;
    console.log(newBorrowedAmount);
    setBorrowedAmount(newBorrowedAmount);

    // Calculate and update the new lent amount (subtract the borrowed amount from the previous lent amount)
    setLentAmount((prevLentAmount) => prevLentAmount - amount);
  };

  const handleBorrowedAmount = (value)=>{
    const parsedValue = parseFloat(value);
    setBorrowedAmount(parsedValue+ borrowedAmount);
  };

  const handleLentAmount = (value)=>{
    const parsedValue = parseFloat(value);
    setLentAmount( parsedValue+ lentAmount);
  };

  return (
    <div className="App container">
      <h1>Basic Borrowing & Lending App</h1>
      <ConnectWallet setWallet={setWallet} />
      <ViewBalance wallet={wallet} />
      
      <BorrowAsset
        wallet={wallet}
        handleBorrow={handleBorrow} // Pass the handleBorrow function
        temp={handleBorrowedAmount}
      />
      
      <LendAsset
        wallet={wallet}
        lentAmount={lentAmount}
        temp={handleLentAmount}
      />
      
      <div>
        <h2>Borrowed Amount: {borrowedAmount} ETH</h2>
        <h2>Lent Amount: {lentAmount} ETH</h2>
      </div>
    </div>
  );
}

export default App;
