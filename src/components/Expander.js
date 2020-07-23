import React, { useState } from 'react';
import '../styles/Expander.css';

export default function Expander ({ text, textLen = 320 }) {

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="expander" style={{ maxHeight: isExpanded ? '100%' : '200px' }}>
      <div>{text}</div>
      {text.length > textLen && <span onClick={() => { setIsExpanded(!isExpanded); }}>
        <i className={"fa fa-" + (isExpanded ? "chevron-up" : "chevron-down")}></i>
      </span>}
    </div>
  );
}