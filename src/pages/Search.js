import React, { useEffect, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import ListTracks from '../containers/ListTracks';
import ListGenres from '../containers/ListGenres';

export default function Search (props) {

  const searchQuery = useStoreState(state => state.searchQuery);
  const getTracksBySearch = useStoreActions(actions => actions.getTracksBySearch);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    let userQuery = props.location.search.split("=");

    if (userQuery[1] && userQuery[1].length > 0) {
      getTracksBySearch(userQuery[1]).then(result => {
        if (result && result.length > 0) {
          setTracks([]);
          setTimeout(() => { setTracks(result); }, 500);
        }
      });
    }
  }, [props.location.search]);

  return (<>
    <ListGenres />
    <div className="container mt-4 mb-0">
      <div className="btn btn-dark text-uppercase fs-12 lsp2 mr-0">
        <i className="fas fa-search fs-14"></i> Search results for
      </div>
      <div className="btn btn-warning text-uppercase fs-12 lsp2 m-0">{searchQuery || 'Not found'}</div>
    </div>
    <ListTracks tracks={tracks} />
  </>);
}