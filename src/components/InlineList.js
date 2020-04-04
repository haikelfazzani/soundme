import React from 'react';

export default function InlineList ({ children, data }) {
  return (
    <div className="list-genres">
      <div className="container">
        <ul className="overflow-auto">

          {data.map(g => <li className="list-group-item cp fs-12 text-uppercase" key={g}>{g}</li>)}

          {children && <li className="list-group-item cp fs-12 text-uppercase p-0">
            {children}
          </li>}

        </ul>
      </div>
    </div>
  );
}