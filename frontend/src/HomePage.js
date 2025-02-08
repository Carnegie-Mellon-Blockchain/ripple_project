import { Link } from "react-router-dom";
import React from 'react';
import Header from './Header';

function HomePage() {
return (
    <div>
      <Header />
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
    </div>
  );
}

export default HomePage;
