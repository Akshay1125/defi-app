import React, { useState } from 'react';
import { ethers } from 'ethers';

function BorrowAsset({ wallet, handleBorrow, temp }) {
  const [amount, setAmount] = useState('');
  const [borrowingInProgress, setBorrowingInProgress] = useState(false);

  const handleBorrowClick = async () => {
    
    if (wallet) {
      // Check if borrowing is already in progress to prevent multiple clicks
      if (borrowingInProgress) {
        alert('wallet')
        return;
      }

      try {
        alert('entered')
        // Convert the input amount to Wei (1 Ether = 10^18 Wei)
        const amountInWei = ethers.utils.parseEther(amount);

        // Replace 'lendingContractAddress' with the actual address of the lending smart contract
        const lendingContractAddress = '0x46CF350071D5f23eD129F84D96e6F546b16Dab99';

        // Create a contract instance for the lending smart contract
        const lendingContract = new ethers.Contract(
          lendingContractAddress,
          [
            'function lend(uint256 amount) payable', // Update this to match your contract's function
          ],
          wallet
        );

        // Call the borrow function of the lending smart contract
        const tx = await lendingContract.borrow(amountInWei, {
          value: amountInWei,
        });

        // Show that borrowing is in progress
        setBorrowingInProgress(true);

        // Wait for the transaction to be mined
        await tx.wait();

        // Reset the form and state after successful borrowing
        setAmount('');
        setBorrowingInProgress(false);
        handleBorrow(amount);
       

        alert('Borrowing successful!');
      } catch (error) {
        console.error('Error borrowing:', error);
        setBorrowingInProgress(false);
      }
    }
    temp(amount)
    setAmount('');
  };

  return (
    <div className='borrow-asset-container card'>
      <h2>Borrow Asset:</h2>
      <input
        className='borrow-asset-input'
        type="number"
        placeholder="Amount in Wei (1 Ether = 10^18 Wei)"
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


