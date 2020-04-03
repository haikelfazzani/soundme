import React from 'react';

export default function InlineList ({ children, data, onItemClick, active }) {
  return (
    <div className="list-genres">
      <div className="container">
        <ul className="overflow-auto">

          {data.map(g => <li
            className={"list-group-item cp fs-12 text-uppercase " + (active === g ? "active" : "")}
            key={g}
            onClick={() => { onItemClick(g) }}>
            {g}
          </li>)}

          {children && <li className="list-group-item cp fs-12 text-uppercase p-0">
            {children}
          </li>}

        </ul>
      </div>
    </div>
  );
}