import React from 'react';

const data = ['', '', '', '', '', '', '', '', '', '', '', ''];

export default function SkeletonLyrics () {
  return (
    <div className="skeleton-container w-100">
      <div className="card-skeleton mb-3 w-100">
        <div className="wrapper">
          <div className="comment animate w-25"></div>
          <div className="comment animate w-25"></div>
          <div className="comment animate w-25"></div>
          <div className="comment animate w-25"></div>
          <div className="comment animate w-50"></div>
          <div className="comment animate w-50"></div>
          <div className="comment animate w-75"></div>
          <div className="comment animate w-75"></div>
          {data.map((d,i) => <div className="comment animate" key={'skl'+i}></div>)}
        </div>
      </div>
    </div>
  );
}