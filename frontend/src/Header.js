import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}> ClarityFi</h1>
      <p style={styles.subtitle}>Start your onchain credit journey powered by Ripple</p>
    </header>
  );
};

const styles = {
  header: {
    width: '100%',
    backgroundColor: '#f8f9fa',
    padding: '20px 0',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  title: {
    margin: 0,
    fontSize: '24px',
    color: '#333',
  },
  subtitle: {
    marginTop: '10px',
    fontSize: '16px',
    color: '#555',
  },
};

export default Header;
