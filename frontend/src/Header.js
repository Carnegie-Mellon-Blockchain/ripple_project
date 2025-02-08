// src/Header.js
import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>ClarityFi</h1>
    </header>
  );
};

const styles = {
  header: {
    width: '100%',
    backgroundColor: '#f8f9fa',
    padding: '10px 0',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  title: {
    margin: 0,
    fontSize: '24px',
    color: '#333',
  },
};

export default Header;
