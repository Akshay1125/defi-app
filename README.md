# DeFi Lending and Borrowing Platform

## Overview

![Sample Image](https://github.com/Akshay1125/defi-app/blob/main/Screenshot%20(177).png)
![Sample Image](https://github.com/Akshay1125/defi-app/blob/main/Screenshot%20(179).png)
![Sample Image](https://github.com/Akshay1125/defi-app/blob/main/Screenshot%20(178).png)
![Sample Image](https://github.com/Akshay1125/defi-app/blob/main/Screenshot%20(180).png)
![Sample Image](https://github.com/Akshay1125/defi-app/blob/main/Screenshot%20(181).png)


This project is a decentralized finance (DeFi) lending and borrowing platform built using React.js, Solidity, Truffle, Metamask, Ganache and Ethers. It allows users to connect their Metamask wallets to the platform, borrow assets, lend assets, and keep track of their borrowing and lending activities.

## Features

- Connect your site to your Metamask wallet.
- Create and deploy a smart contract using Truffle and Solidity.
- Borrow assets from the lending pool.
- Lend assets to earn interest.
- Keep track of the amount you have borrowed and lent.

## Technologies Used

- **React.js:** Used for building the user interface and frontend of the application.
- **Solidity:** Used to write the smart contract that powers the lending and borrowing functionality.
- **Truffle:** Used to develop, compile, and deploy the Solidity smart contract.
- **Metamask:** Integrated to enable users to connect their wallets securely.
- **Ethers:** Used to interact with the Ethereum blockchain and the smart contract.
- **Ganache:** Used to generate a seperate Test Network and private key for account.

##Points To Remember: 
- You will need to create react app first
- Download Metamask Extension and create a test network Ganache UI.
- Connect your metamask account to your frontend.
- Install Ganache and generate private keys.
- Use these Keys to import an account with test amount.
- Install Truffle suite, details provided below.
- Create smart contract and deploy it on other command line server using commands=> (truffle compile) & (truffle migrate).
- Include your functions now.
- You are good to go.
- You can find the components code in src, CSS in public and contracts in frontend/truffle.


## Installation and Usage

1. Clone this repository to your local machine.
   ```
   git clone [repository_url]
   ```

2. Navigate to the project directory.
   ```
   cd [project_directory]
   ```

3. Install project dependencies using npm.
   ```
   npm install
   ```

4. Run the application.
   ```
   npm start
   ```

## Smart Contract Deployment

To deploy the smart contract using Truffle:

1. Configure your Truffle environment and Ethereum network settings. You can refer to [Truffle's documentation](https://trufflesuite.com/truffle/) for detailed instructions.

2. Write your Solidity smart contract in the `contracts/` directory.

3. Migrate the contract to the network using Truffle.
   ```
   truffle migrate
   ```

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.

2. Create a new branch for your feature or bug fix.

3. Commit your changes and push them to your fork.

4. Submit a pull request to the main repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

Thanks to the open-source community for their contributions to the tools and technologies used in this project.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# React Truffle Box

This box comes with everything you need to start using Truffle to write, compile, test, and deploy smart contracts, and interact with them from a React app.

## Installation

First ensure you are in an empty directory.

Run the `unbox` command using 1 of 2 ways.

```sh
# Install Truffle globally and run `truffle unbox`
$ npm install -g truffle
$ truffle unbox react
```

```sh
# Alternatively, run `truffle unbox` via npx
$ npx truffle unbox react
```

Start the react dev server.

```sh
$ cd client
$ npm start
```

From there, follow the instructions on the hosted React app. It will walk you through using Truffle and Ganache to deploy the `SimpleStorage` contract, making calls to it, and sending transactions to change the contract's state.

## FAQ

- __How do I use this with Ganache (or any other network)?__

  The Truffle project is set to deploy to Ganache by default. If you'd like to change this, it's as easy as modifying the Truffle config file! Check out [our documentation on adding network configurations](https://trufflesuite.com/docs/truffle/reference/configuration/#networks). From there, you can run `truffle migrate` pointed to another network, restart the React dev server, and see the change take place.

- __Where can I find more resources?__

  This Box is a sweet combo of [Truffle](https://trufflesuite.com) and [Webpack](https://webpack.js.org). Either one would be a great place to start!
