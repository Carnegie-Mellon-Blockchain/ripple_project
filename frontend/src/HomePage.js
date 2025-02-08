import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Header from './Header';
import WalletConnect from './WalletConnect'; // Import WalletConnect component
import AccountInformation from './AccountInformation'; // Import AccountInformation if needed
import Interactions from './Interactions'; // Import Interactions if needed
import videos from "./videos.json";

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
		{videos.map((video) => (
			<div key={video.id} style={{ backgroundColor: "lightgray", padding: "10px", borderRadius: "8px" }}>
				<Link to={`/video/${video.id}`} style={{ textDecoration: "none", color: "inherit" }}>
					<p>{video.title}</p>
					<img src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
						alt={video.title}
						style={{ maxWidth: "100%", borderRadius: "8px" }}
					/>
				</Link>
			</div>
		))}
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
