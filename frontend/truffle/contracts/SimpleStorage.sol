// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lending {
    struct Loan {
        address borrower;
        uint256 amount;
        uint256 interestRate;
        uint256 duration;
        uint256 endTime;
        bool active;
    }

    Loan[] public loans;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this action");
        _;
    }

    function lend(uint256 amount, uint256 interestRate, uint256 duration) external payable {
        require(msg.value == amount, "Incorrect amount sent");

        loans.push(
            Loan({
                borrower: msg.sender,
                amount: amount,
                interestRate: interestRate,
                duration: duration,
                endTime: block.timestamp + duration,
                active: true
            })
        );
    }

    function repayLoan(uint256 loanId) external payable {
        Loan storage loan = loans[loanId];
        require(loan.active, "Loan is not active");
        require(msg.sender == loan.borrower, "Only the borrower can repay");
        require(msg.value == calculateRepaymentAmount(loan.amount, loan.interestRate), "Incorrect repayment amount");

        loan.active = false;
    }

    function getLoanCount() external view returns (uint256) {
        return loans.length;
    }

    function calculateRepaymentAmount(uint256 principal, uint256 interestRate) internal pure returns (uint256) {
        return (principal * interestRate) / 100 + principal;
    }
}