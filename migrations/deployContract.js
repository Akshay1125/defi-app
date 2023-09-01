// 2_deploy_contract.js
const artifacts = require('truffle-artifactor');

const MyContract = artifacts.require("MyContract");

module.exports = function(deployer) {
  deployer.deploy(MyContract);
};
