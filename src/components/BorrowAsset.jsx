import React, { useState } from 'react';
import { ethers } from 'ethers';

function BorrowAsset({ wallet , handleBorrow, temp}) {
  const [amount, setAmount] = useState('');
  const [borrowingInProgress, setBorrowingInProgress] = useState(false);

  const handleBorrowClick = () => {
    temp(amount);
  }

  return (
    <div className='borrow-asset-container card'>
      <h2>Borrow Asset:</h2>
      <input className='borrow-asset-input'
        type="number"
        placeholder="Amount in Ether"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleBorrowClick} disabled={borrowingInProgress} className='borrow-asset-button'>
        Borrow
      </button>
    </div>
  );
}

export default BorrowAsset;