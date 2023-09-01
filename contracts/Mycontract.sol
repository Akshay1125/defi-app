// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract P2PLending {
    // The minimum and maximum amount of ETH that can be loaned
    uint public constant MIN_LOAN_AMOUNT = 0.1 ether;
    uint public constant MAX_LOAN_AMOUNT = 10 ether;
    // The minimum and maximum interest rate in percentage that can be set for a loan
    uint public constant MIN_INTEREST_RATE = 1;
    uint public constant MAX_INTEREST_RATE = 10;
    struct Loan {
        uint amount;
        uint interest;
        uint duration;
        uint repaymentAmount;
        uint fundingDeadline;
        address borrower;
        address payable lender;
        bool active;
        bool repaid;
    }
    mapping(uint => Loan) public loans;
    uint public loanCount;
    event LoanCreated(
        uint loanId,
        uint amount,
        uint interest,
        uint duration,
        uint fundingDeadline,
        address borrower,
        address lender
    );
    event LoanFunded(uint loanId, address funder, uint amount);
    event LoanRepaid(uint loanId, uint amount);
    modifier onlyActiveLoan(uint _loanId) {
        require(loans[_loanId].active, "Loan is not active");
        _;
    }
    modifier onlyBorrower(uint _loanId) {
        require(
            msg.sender == loans[_loanId].borrower,
            "Only the borrower can perform this action"
        );
        _;
    }
    function createLoan(
        uint _amount,
        uint _interest,
        uint _duration
    ) external payable {
        require(
            _amount >= MIN_LOAN_AMOUNT && _amount <= MAX_LOAN_AMOUNT,
            "Loan amount must be between MIN_LOAN_AMOUNT and MAX_LOAN_AMOUNT"
        );
        require(
            _interest >= MIN_INTEREST_RATE && _interest <= MAX_INTEREST_RATE,
            "Interest rate must be between MIN_INTEREST_RATE and MAX_INTEREST_RATE"
        );
        require(_duration > 0, "Loan duration must be greater than 0");
        uint _repaymentAmount = _amount + (_amount * _interest) / 100;
        uint _fundingDeadline = block.timestamp + (1 days);
        uint loanId = loanCount++;
        Loan storage loan = loans[loanId];
        loan.amount = _amount;
        loan.interest = _interest;
        loan.duration = _duration;
        loan.repaymentAmount = _repaymentAmount;
        loan.fundingDeadline = _fundingDeadline;
        loan.borrower = msg.sender;
        loan.lender = payable(address(0));
        loan.active = true;
        loan.repaid = false;
        emit LoanCreated(
            loanId,
            _amount,
            _interest,
            _duration,
            _fundingDeadline,
            msg.sender,
            address(0)
        );
    }
    function fundLoan(uint _loanId) external payable onlyActiveLoan(_loanId) {
        Loan storage loan = loans[_loanId];
        require(
            msg.sender != loan.borrower,
            "Borrower cannot fund their own loan"
        );
        require(loan.amount == msg.value, "not enough");
        require(
            block.timestamp <= loan.fundingDeadline,
            "Loan funding deadline has passed"
        );
        payable(address(this)).transfer(msg.value);
        loan.lender = payable(msg.sender);
        loan.active = false;
        emit LoanFunded(_loanId, msg.sender, msg.value);
    }
    function repayLoan(
        uint _loanId
    ) external payable onlyActiveLoan(_loanId) onlyBorrower(_loanId) {
        require(
            msg.value == loans[_loanId].repaymentAmount,
            "Incorrect repayment amount"
        );
        loans[_loanId].lender.transfer(msg.value);
        loans[_loanId].repaid = true;
        loans[_loanId].active = false;
        emit LoanRepaid(_loanId, msg.value);
    }
    function getLoanInfo(
        uint _loanId
    )
        external
        view
        returns (
            uint amount,
            uint interest,
            uint duration,
            uint repaymentAmount,
            uint fundingDeadline,
            address borrower,
            address lender,
            bool active,
            bool repaid
        )
    {
        Loan storage loan = loans[_loanId];
        return (
            loan.amount,
            loan.interest,
            loan.duration,
            loan.repaymentAmount,
            loan.fundingDeadline,
            loan.borrower,
            loan.lender,
            loan.active,
            loan.repaid
        );
    }
    function withdrawFunds(uint _loanId) external onlyBorrower(_loanId) {
        Loan storage loan = loans[_loanId];
        require(loan.active = false);
        payable(msg.sender).transfer(loan.amount);
    }
}