import React from 'react';

export default function SkeletonUser ({bg}) {
  return (
    <div className="skeleton-container w-100">
      <div className="card-skeleton mb-3 w-100" style={{ backgroundColor: bg }}>
        <div className="wrapper">
          <div className="picture animate"></div>
          <div className="comment animate"></div>
          <div className="comment animate"></div>
          <div className="comment animate"></div>
        </div>
      </div>
    </div>
  );
}