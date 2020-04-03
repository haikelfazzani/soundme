import React, { useEffect, useState, useContext } from 'react';
import ScService from '../services/ScService';
import GlobalContext from '../providers/GlobalContext';

import '../styles/ListGenres.css';
import ListTracks from '../containers/ListTracks';
import ListGenres from '../containers/ListGenres';

export default function Home () {

  const { state } = useContext(GlobalContext);
  const [tracks, setTracks] = useState([]);


  useEffect(() => {
    ScService.getTracks(state.activeGenre)
      .then((result) => {
        if (result && result.length > 0) {
          setTracks([]);
          setTimeout(() => { setTracks(result); }, 500);
        }
      })
      .catch(e => { });
  }, [state.activeGenre]);



  return (<>
    <ListGenres />
    <ListTracks tracks={tracks} />
  </>);
}
