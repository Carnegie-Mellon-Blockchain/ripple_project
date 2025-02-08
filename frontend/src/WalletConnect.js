import React, { useState } from 'react';
import sdk from '@crossmarkio/sdk';
import { useWallet } from './context/WalletContext';
import PropTypes from 'prop-types';
import mixpanel from 'mixpanel-browser';

const WalletConnect = ({ onConnectionChange }) => {
  const [isInstalled, setIsInstalled] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [network, setNetwork] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { address, setAddress } = useWallet();

  // Check if wallet is installed
  const checkWalletInstallation = () => {
    const installed = sdk.sync.isInstalled();
    setIsInstalled(installed ?? false);
    return installed;
  };

  // Connect Wallet
  const connectWallet = async () => {
    try {
      let response = await sdk.async.signInAndWait();
      if (response.response.data.address) {
        const connectedAddress = response.response.data.address;
        setIsConnected(true);
        onConnectionChange(true);
        setAddress(connectedAddress);

        // Fetch network info
        const currentNetwork = await sdk.sync.getNetwork();
        setNetwork(currentNetwork);

        console.log('Connected with address:', connectedAddress);

        mixpanel.track('Wallet Connected', {
          userId: connectedAddress,
          timestamp: new Date().toISOString(),
        });
      } else {
        setIsConnected(false);
        onConnectionChange(false);
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      setIsConnected(false);
      onConnectionChange(false);
    }
  };

  // Fetch Token Balance
  const fetchBalance = async () => {
    if (!address) {
      setError('No wallet connected');
      return;
    }

    setLoading(true);
    try {
		const response = await fetch(`http://localhost:8888/api/user_balance/${address}`, {
		  method: 'GET',
		  headers: { 'Content-Type': 'application/json' },
		});

      if (!response.ok) throw new Error('Failed to fetch balance');

      const data = await response.json();
		console.log(data);
      setBalance(data);

      mixpanel.track('Token Balance Retrieved', {
        userId: address,
        balance: data.balance,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wallet-connect">
      <button onClick={connectWallet} disabled={isConnected}>
        {isInstalled === false ? 'Install Wallet First' : isConnected ? 'Wallet Connected' : 'Connect Wallet'}
      </button>

      {network && (
        <div>
          <h3>Current Network:</h3>
          <p>Label: {network.label}</p>
          <p>Protocol: {network.protocol}</p>
        </div>
      )}

      {isConnected && (
        <div>
          <button onClick={fetchBalance} disabled={loading}>
            {loading ? 'Fetching...' : 'Get Token Balance'}
          </button>
          {balance !== null && <p>Your Token Balance: {balance}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
    </div>
  );
};

WalletConnect.propTypes = { onConnectionChange: PropTypes.func.isRequired };

export default WalletConnect;
