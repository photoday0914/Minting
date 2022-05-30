import './App.css';
import { useState} from "react";
// import { ethers } from 'hardhat';
import {BigNumber, Contract, ethers} from "ethers";

import contractAddress from "./contracts/contract-address.json"
import mintExampleAbi from "./contracts/MintExample.json"

function App() {
  const [mintAmount, setmintAmount] = useState(0);
  const [account, setAccount] = useState([]);

  return (
    <div className="App">
      <button onClick={connect}>connect</button>
      <button onClick={() => setmintAmount(mintAmount + 1)}>increase</button>
      <p>{mintAmount}</p>
      <button onClick={() => {
        if (mintAmount > 0) setmintAmount(mintAmount - 1)}}>decrease</button>
      <button onClick={() => handleMint(mintAmount) }>mint</button>
    </div>
  );

  async function connect() {
    const [selectedAddress] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log(selectedAddress);
    setAccount(selectedAddress);
  }

  async function handleMint(mintAmount) {
    if (window.ethereum && mintAmount > 0) {
      const provider = new ethers.providers.Web3Provider(window.ethereum); //use Web3Provider for metamask
      const balance =  await provider.getBalance(account);

      if ( balance.toNumber() == 0 ) {
        alert("You have no ether. Get ethers first! Execute the following in terminal.\nnpx hardhat --network localhost faucet "+account);
        return;
      }
      // console.log(provider);
      const signer = provider.getSigner();
     
      const contract = new Contract(contractAddress.Address, mintExampleAbi.abi, signer);
      
      try {
        const reponse = await contract.mint(BigNumber.from(mintAmount));
        console.log(reponse);
      } catch (err){
        console.log(err);
      }
    }   
  }
}

export default App;
