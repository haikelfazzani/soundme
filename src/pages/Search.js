import React, { useEffect, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import ListTracks from '../containers/ListTracks';
import ListGenres from '../containers/ListGenres';
import { withRouter } from 'react-router-dom';

function Search (props) {

  const searchQuery = useStoreState(state => state.searchQuery);
  const { setSearchQuery, getTracksBySearch } = useStoreActions(actions => actions);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    let userQuery = props.location.search.split("=");

    if (userQuery[1] && userQuery[1].length > 0) {

      setSearchQuery(window.decodeURIComponent(userQuery[1]));

      getTracksBySearch(userQuery[1])
        .then(result => {
          if (result && result.length > 0) {
            setTracks(result);
          }
        })
        .catch(e => {
          props.history.goBack();
        });
    }
  }, [props.location.search]);

  return (<>
    <ListGenres />
    <div className="container mt-4 mb-0">
      <div className="btn btn-dark text-uppercase fs-12 lsp2 mr-0">
        <i className="fas fa-search fs-14"></i> Search results for
      </div>
      <div className="btn btn-warning text-uppercase fs-12 lsp2 m-0">{searchQuery || 'Not found'} ({tracks.length})</div>
    </div>
    <ListTracks tracks={tracks} />
  </>);
}

export default withRouter(Search);
