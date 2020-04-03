import React, { useEffect, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import '../styles/ListGenres.css';
import ListTracks from '../containers/ListTracks';
import ListGenres from '../containers/ListGenres';

export default function Home () {

  const activeGenre = useStoreState(state => state.activeGenre);
  const getTracksByGenre = useStoreActions(actions => actions.getTracksByGenre);

  const [tracks, setTracks] = useState([]);


  useEffect(() => {
    getTracksByGenre(activeGenre)
      .then(result => {
        if (result && result.length > 0) {
          setTracks([]);
          setTimeout(() => { setTracks(result); }, 500);
          localStorage.setItem('sc-tracks', JSON.stringify(result));
        }
      })
      .catch(e => {
        let t = JSON.parse(localStorage.getItem('sc-tracks'));
        setTracks(t);
       });
  }, [activeGenre]);



  return (<>
    <ListGenres />
    <ListTracks tracks={tracks} />
  </>);
}
