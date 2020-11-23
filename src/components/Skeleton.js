import React from 'react';
import '../styles/Skeleton.css';

const data = ['', '', '', '', '', '', '', '', '', '', '', ''];

export default function Skeleton ({ bg }) {

  return <div className="skeleton-container mt-3">
    {data.map((d, i) => <div className="card-skeleton mb-3" key={'sk' + i} style={{ backgroundColor: bg }}>
      <div className="wrapper">
        <div className="picture animate"></div>
        <div className="comment animate"></div>
        <div className="comment animate"></div>
        <div className="comment animate"></div>
      </div>
    </div>)}
  </div>;
}