require("@nomiclabs/hardhat-ganache")
require('@nomiclabs/hardhat-truffle5')

module.exports = {
  networks: {
    // Development network is just left as truffle's default settings
    ganache: {
      url: 'http://localhost:8545',
      gasLimit: 5000000,
      gasPrice: 1000000000,  // 1 gwei (in wei)
      defaultBalanceEther: 100
    },
    ethermint: {
      url: 'http://localhost:8545',
      gasLimit: 5000000,     // Gas sent with each transaction
      gasPrice: 1000000000,  // 1 gwei (in wei)
    },
  },
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 10000,
      },
    },
  },
}
