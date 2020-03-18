import React, { useState } from 'react';
import GlobalContext from './GlobalContext';

/** init values global state */
let initState = {
  currentTrackPlay: {},
  isPlaying: false
};

export default function GlobalProvider ({ children }) {
  const [state, setState] = useState(initState);
  return <GlobalContext.Provider value={{ state, setState }}>
    {children}
  </GlobalContext.Provider>;
}