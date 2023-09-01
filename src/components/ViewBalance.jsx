import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function ViewBalance({ wallet }) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (wallet) {
      const updateBalance = async () => {
        const balance = await wallet.getBalance();
        setBalance(ethers.utils.formatEther(balance));
      };

      updateBalance();
    }
  }, [wallet]);

  return (
    <div>
      <h2>Account Balance:</h2>
      <p>{balance} ETH</p>
    </div>
  );
}

export default ViewBalance;
