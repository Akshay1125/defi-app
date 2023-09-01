import React, { useState } from 'react';
import { ethers } from 'ethers';

function LendAsset({ wallet ,temp}) {
  const [amount, setAmount] = useState('');

  const handleLend = () => {
    temp(amount);
  };

  return (
    <div className='card'>
      <h2>Lend Asset:</h2>
      <input className='lend-asset-input'
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleLend} className='lend-asset-button'>Lend</button>
    </div>
  );
}

export default LendAsset;
