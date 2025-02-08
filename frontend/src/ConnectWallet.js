// src/ConnectWallet.js
import React, { useState } from 'react';
import { BrowserProvider } from 'ethers';

const ConnectWallet = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      }
    } else {
      alert('MetaMask is not installed. Please install it to use this feature.');
    }
  };

  return (
    <div>
      {walletAddress ? (
        <p>Connected Wallet Address: {walletAddress}</p>
      ) : (
        <button onClick={connectWallet}>Connect to Wallet</button>
      )}
    </div>
  );
};

export default ConnectWallet;
