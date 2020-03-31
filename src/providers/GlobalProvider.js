import React, { useState, useEffect } from 'react';
import GlobalContext from './GlobalContext';

/** init values global state */
let initState = {
  currentTrackPlay: {},
  favoriteTracks: [],
  activeGenre: 'Rock',
  currentTrackIndex: 0,
  searchQuery: ''
};

if (localStorage.getItem('soundme')) {
  initState = JSON.parse(localStorage.getItem('soundme'));
}

export default function GlobalProvider ({ children }) {
  const [state, setState] = useState(initState);

  useEffect(() => {
    localStorage.setItem('soundme', JSON.stringify(state));
  }, [state]);

  return <GlobalContext.Provider value={{ state, setState }}>
    {children}
  </GlobalContext.Provider>;
}