import React, { createContext, useContext, useState } from "react";

// ✅ Create Wallet Context
const WalletContext = createContext();

// ✅ Provider Component to wrap the app
export const WalletProvider = ({ children }) => {
  const [address, setAddress] = useState(null);

  return (
    <WalletContext.Provider value={{ address, setAddress }}>
      {children}
    </WalletContext.Provider>
  );
};

// ✅ Custom Hook to access Wallet Context (Only Declare Once!)
export const useWallet = () => {
  return useContext(WalletContext);
};
