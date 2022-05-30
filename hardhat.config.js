require("@nomiclabs/hardhat-waffle");
require("./tasks/faucet")

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
const API_KEY = '5d4cc2fc91774584abe20b59c92d31c2';
const PRAIVATE_KEY = 'bf1578f5b713ea14fb1675ae4aae47c425b71b06e4dde346e49ddf016a08bb61'; //it can be get from metamask or other wallets

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    goerli: {
      url:`https://goerli.infura.io/v3/${API_KEY}`,
      accounts:[`${PRAIVATE_KEY}`]
    }
  }
};
