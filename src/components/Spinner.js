import React from 'react';
import '../styles/Spinner.css';

export default function Spinner () {
  return <div className="spinner-container">
    <div className="loader" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>;
}