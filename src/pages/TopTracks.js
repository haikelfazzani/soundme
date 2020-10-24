import React, { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import debounce from '../util/debounce';
import ListGenres from '../containers/ListGenres';
import ListTracks from '../containers/ListTracks';

export default function TopTracks () {

  const activeGenre = useStoreState(state => state.activeGenre);
  const getTopTracksByGenre = useStoreActions(actions => actions.getTopTracksByGenre);

  const [tracks, setTracks] = useState([]);
  const [limit, setLimit] = useState(48);

  useEffect(() => {
    getTopTracksByGenre({ activeGenre })
      .then(result => {
        if (result && result.length > 0) {
          setTracks([]);
          setTracks(result);
          console.log(result);
          localStorage.setItem('sc-top-tracks', JSON.stringify(result));
        }
      })
      .catch(e => {
        let t = JSON.parse(localStorage.getItem('sc-top-tracks'));
        setTracks(t);
      });
  }, [activeGenre]);

  const onLoadMore = debounce(() => {
    getTopTracksByGenre({ activeGenre, limit: limit + 48 })
      .then(result => {
        if (result && result.length > 0) {
          setTracks(result);
          setLimit(limit + 48);
          localStorage.setItem('sc-tracks', JSON.stringify(result));
        }
      })
      .catch(e => {
        let t = JSON.parse(localStorage.getItem('sc-tracks'));
        setTracks(t);
      });
  });

  return (<>
    <ListGenres />
    <ListTracks tracks={tracks} />
    <div className="w-100 d-flex justify-content-center">
      <button className="btn btn-dark w-25 fs-10 lsp2" onClick={onLoadMore}>LOAD MORE</button>
    </div>
  </>);
}