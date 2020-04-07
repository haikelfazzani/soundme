import React, { useEffect, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import '../styles/ListGenres.css';
import ListTracks from '../containers/ListTracks';
import ListGenres from '../containers/ListGenres';

export default function Home () {

  const activeGenre = useStoreState(state => state.activeGenre);
  const getTracksByGenre = useStoreActions(actions => actions.getTracksByGenre);

  const [tracks, setTracks] = useState([]);
  const [limit, setLimit] = useState(48);

  useEffect(() => {
    getTracksByGenre({ activeGenre })
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

  const onLoadMore = () => {
    getTracksByGenre({ activeGenre, limit: limit + 48 })
      .then(result => {
        if (result && result.length > 0) {
          setTracks([]);
          setTimeout(() => { setTracks(result); }, 500);
          setLimit(limit + 48)
          localStorage.setItem('sc-tracks', JSON.stringify(result));
        }
      })
      .catch(e => {
        let t = JSON.parse(localStorage.getItem('sc-tracks'));
        setTracks(t);
      });
  }

  return (<>
    <ListGenres />
    <ListTracks tracks={tracks} />
    <div className="w-100 d-flex justify-content-center">
      <button className="btn btn-dark w-25 fs-12" onClick={onLoadMore}>LOAD MORE</button>
    </div>
  </>);
}
