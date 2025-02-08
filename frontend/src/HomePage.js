import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Header from './Header';
import WalletConnect from './WalletConnect'; // Import WalletConnect component
import AccountInformation from './AccountInformation'; // Import AccountInformation if needed
import Interactions from './Interactions'; // Import Interactions if needed

function HomePage() {
  const [isConnected, setIsConnected] = useState(false); // State to track wallet connection

  const handleConnectionChange = (connected) => {
    setIsConnected(connected); // Update connection state when wallet connects/disconnects
  };

  return (
    <div>
      {/* Wallet Connect Section */}
      <WalletConnect onConnectionChange={handleConnectionChange} />
      
      {/* Header Section */}
      <Header />

      {/* Main Content Section */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(3, 1fr)", // Always 3 columns
        gap: "16px",
        padding: "20px"
      }}>
        {/* Video Card 1 */}
        <div style={{ backgroundColor: "lightgray", padding: "10px", borderRadius: "8px" }}>
          <Link to="/video/OyCVgveTcX4" style={{ textDecoration: "none", color: "inherit" }}>
            <p>SHOULD BE SOME TITLE OF THE VIDEO</p>
            <img
              src="https://img.youtube.com/vi/OyCVgveTcX4/hqdefault.jpg"
              style={{ maxWidth: "100%", borderRadius: "8px" }}
            />
          </Link>
        </div>

        {/* Video Card 2 */}
        <div style={{ backgroundColor: "lightgray", padding: "10px", borderRadius: "8px" }}>
          <Link to="/video/OyCVgveTcX4" style={{ textDecoration: "none", color: "inherit" }}>
            <p>SHOULD BE SOME TITLE OF THE VIDEO</p>
            <img
              src="https://img.youtube.com/vi/OyCVgveTcX4/hqdefault.jpg"
              style={{ maxWidth: "100%", borderRadius: "8px" }}
            />
          </Link>
        </div>

        {/* Video Card 3 */}
        <div style={{ backgroundColor: "lightgray", padding: "10px", borderRadius: "8px" }}>
          <Link to="/video/OyCVgveTcX4" style={{ textDecoration: "none", color: "inherit" }}>
            <p>SHOULD BE SOME TITLE OF THE VIDEO</p>
            <img
              src="https://img.youtube.com/vi/OyCVgveTcX4/hqdefault.jpg"
              style={{ maxWidth: "100%", borderRadius: "8px" }}
            />
          </Link>
        </div>

        {/* Video Card 4 */}
        <div style={{ backgroundColor: "lightgray", padding: "10px", borderRadius: "8px" }}>
          <Link to="/video" style={{ textDecoration: "none", color: "inherit" }}>
            <p>SHOULD BE SOME TITLE OF THE VIDEO</p>
            <img
              src="https://img.youtube.com/vi/OyCVgveTcX4/hqdefault.jpg"
              style={{ maxWidth: "100%", borderRadius: "8px" }}
            />
          </Link>
        </div>

        {/* Add more video cards here */}
      </div>

      {/* Conditional Rendering for Wallet-Connected Features */}
      {isConnected && (
        <>
          {/* Account Information Section */}
          <AccountInformation />

          {/* Interactions Section */}
          <Interactions />
        </>
      )}
    </div>
  );
}

export default HomePage;
