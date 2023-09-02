import React, { useState } from 'react';
import { ethers } from 'ethers';

function LendAsset({ wallet, handleLend,temp}) {
  const [amount, setAmount] = useState('');
  const [lendingInProgress, setLendingInProgress] = useState(false);

  const handleLendClick = async () => {
    if (wallet) {
      // Check if lending is already in progress to prevent multiple clicks
      if (lendingInProgress) {
        return;
      }

      try {
        // Convert the input amount to Wei (1 Ether = 10^18 Wei)
        const amountInWei = ethers.utils.parseEther(amount);

        // Replace 'lendingContractAddress' with the actual address of the lending smart contract
        const lendingContractAddress = '0xBBf486FEBF3E95199caEE28486dB48Ad7688c65c';

        // Create a contract instance for the lending smart contract
        const lendingContract = new ethers.Contract(
          lendingContractAddress,
          [
            'function lend(uint256 amount) payable', // Update this to match your contract's function
          ],
          wallet
        );

        // Call the lend function of the lending smart contract
        const tx = await lendingContract.lend(amountInWei, {
          value: amountInWei,
        });

        // Show that lending is in progress
        setLendingInProgress(true);

        // Wait for the transaction to be mined
        await tx.wait();

        // Reset the form and state after successful lending
        setAmount('');
        setLendingInProgress(false);
        handleLend(amount);

        alert('Lending successful!');
      } catch (error) {
        console.error('Error lending:', error);
        setLendingInProgress(false);
      }
    }
    temp(amount)
    setAmount('');
  };

  return (
    <div className='lend-asset-container card'>
      <h2>Lend Asset:</h2>
      <input
        className='lend-asset-input'
        type="number"
        placeholder="Amount in Wei (1 Ether = 10^18 Wei)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleLendClick} disabled={lendingInProgress} className='lend-asset-button'>
        Lend
      </button>
    </div>
  );
}

export default LendAsset;
