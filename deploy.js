const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "merry else bleak violin twenty about orphan dance example marine cycle soon",
  "https://rinkeby.infura.io/v3/ea1495bc75854a30b531cbaaf76e43c7"
);
const web3 = new Web3(provider);
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account", accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
    })
    .send({
      from: accounts[0],
      gas: "1000000",
    });
  console.log("Contract deployed to:", result.options.address);
  //   To prevent a hanging deployment
  provider.engine.stop();
};
deploy();
