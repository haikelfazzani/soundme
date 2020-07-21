import React from 'react';

const data = ['', '', '', '', '', '', '', '', '', '', '', ''];

export default function SkeletonLyrics () {
  return (
    <div className="skeleton-container">

      <div className="w-100 row ml-0 pr-0">

        <div className="col-md-9 pl-0">
          <div className="wrapper card pb-2">
            <div className="comment animate w-25"></div>
            <div className="comment animate w-25"></div>
            <div className="comment animate w-25"></div>
            <div className="comment animate w-25"></div>
            <div className="comment animate w-50"></div>
            <div className="comment animate w-50"></div>
            <div className="comment animate w-75"></div>
            <div className="comment animate w-75"></div>
            {data.map((d, i) => <div className="comment animate" key={'skl' + i}></div>)}
          </div>
        </div>

        <div className="col-md-3 pr-0">
          <div className="wrapper card pb-2">
            <div className="picture animate"></div>
            <div className="comment animate"></div>
            <div className="comment animate"></div>
            <div className="comment animate"></div>
            <div className="comment animate"></div>
          </div>
        </div>

      </div>
    </div>
  );
}