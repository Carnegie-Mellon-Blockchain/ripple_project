import React, { createContext, useState, useContext } from 'react';

const WalletContext = createContext(undefined);

export const WalletProvider = ({ children }) => {
  const [address, setAddress] = useState('');

  return (
    <WalletContext.Provider value={{ address, setAddress }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};