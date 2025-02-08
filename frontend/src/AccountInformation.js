import React, { useState, useEffect } from 'react';
import { useWallet } from './context/WalletContext';
import sdk from "@crossmarkio/sdk";

const AccountInformation = () => {
  const { address } = useWallet();
  const [network, setNetwork] = useState(null);
  const [error, setError] = useState(null);

const checkNetwork = async () => {
  try {
    const currentNetwork = await sdk.sync?.getNetwork();
    if (currentNetwork && JSON.stringify(currentNetwork) !== JSON.stringify(network)) {
      setNetwork(currentNetwork);
    }
  } catch (err) {
    console.error("Error fetching network:", err);
    setError("Failed to fetch network information.");
  }
};


  useEffect(() => {
    let intervalId;

    const checkNetwork = async () => {
      try {
        const currentNetwork = await sdk.sync?.getNetwork();
        if (currentNetwork && JSON.stringify(currentNetwork) !== JSON.stringify(network)) {
          console.log("Network updated:", currentNetwork);
          setNetwork(currentNetwork);
        }
      } catch (error) {
        console.error("Error fetching network:", error);
      }
    };

    // Initial check
    checkNetwork();

    // Set up interval to check every 5 seconds
    intervalId = setInterval(checkNetwork, 5000);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [network]);

  return (
    <div className="account-information">
      <h2>Account Information</h2>
      <div className="info-section">
        <h3>Current Address:</h3>
        <p>{address || 'Not connected'}</p>
      </div>
      <div className="info-section">
        <h3>Current Network:</h3>
        {network ? (
          <dl className="network-info">
            <dt>Label:</dt>
            <dd>{network.label}</dd>
            <dt>Protocol:</dt>
            <dd>{network.protocol}</dd>
            <dt>Type:</dt>
            <dd>{network.type}</dd>
            <dt>WSS:</dt>
            <dd>{network.wss}</dd>
            <dt>RPC:</dt>
            <dd>{network.rpc}</dd>
          </dl>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default AccountInformation;
