import React, { useState } from 'react';
import sdk from '@crossmarkio/sdk'; // Ensure this is installed or accessible via window object
import { useWallet } from './context/WalletContext';
import PropTypes from 'prop-types'; // Optional for prop validation

const WalletConnect = ({ onConnectionChange }) => {
  const [isInstalled, setIsInstalled] = useState(null);
  const [isConnected, setIsConnected] = useState(null);
  const [network, setNetwork] = useState(null); // Declare state for network info
  const { setAddress } = useWallet();

  const checkWalletInstallation = () => {
    const installed = sdk.sync.isInstalled();
    setIsInstalled(installed ?? false);
    return installed;
  };

  const handleClick = () => {
    if (isInstalled === null) {
      const installed = checkWalletInstallation();
      if (installed) {
        connectWallet();
      }
    } else if (isInstalled === false) {
      window.open(
        'https://chromewebstore.google.com/detail/crossmark-wallet/canipghmckojpianfgiklhbgpfmhjkjg',
        '_blank'
      );
    } else {
      connectWallet();
    }
  };

  const connectWallet = async () => {
    try {
      let response = await sdk.async.signInAndWait();
      if (response.response.data.address) {
        setIsConnected(true);
        onConnectionChange(true);
        setAddress(response.response.data.address);

        // Fetch network info after wallet connection
        const currentNetwork = await sdk.sync.getNetwork();
        setNetwork(currentNetwork);

        console.log("Connected with address:", response.response.data.address);
        console.log("Current Network:", currentNetwork);
      } else {
        setIsConnected(false);
        onConnectionChange(false);
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      setIsConnected(false);
      onConnectionChange(false);
    }
  };

  return (
    <div className="wallet-connect">
      <button 
        onClick={handleClick} 
        className="connect-button"
        disabled={isConnected === true}
      >
        {isInstalled === false ? 'Install Wallet First' : isConnected ? 'Wallet Connected' : 'Connect Wallet'}
      </button>
      
      {/* Display network information */}
      {network && (
        <div className="network-info">
          <h3>Current Network:</h3>
          <p>Label: {network.label}</p>
          <p>Protocol: {network.protocol}</p>
          <p>Type: {network.type}</p>
          <p>WSS: {network.wss}</p>
          <p>RPC: {network.rpc}</p>
        </div>
      )}
    </div>
  );
};

WalletConnect.propTypes = {
  onConnectionChange: PropTypes.func.isRequired,
};

export default WalletConnect;