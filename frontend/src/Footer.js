import React from 'react';
import xrplLogo from './assets/xrpl.png'; // Ensure this logo exists in your assets folder
import crossmarkLogo from './assets/crossmark.png'; // Ensure this logo exists in your assets folder

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <a href="https://xrpl.org/" target="_blank" rel="noopener noreferrer" className="footer-link">
          <img src={xrplLogo} alt="XRPL" className="footer-logo" />
        </a>
        <a href="https://crossmark.io/" target="_blank" rel="noopener noreferrer" className="footer-link">
          <img src={crossmarkLogo} alt="Crossmark" className="footer-logo" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;