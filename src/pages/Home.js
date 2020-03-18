import React, { useEffect, useState } from 'react';
import TrackService from '../services/TrackService';

import Card from '../components/Card';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import Player from '../components/Player';

export default function Home () {

  const [playr, setPlayr] = useState();
  const [tracks, setTracks] = useState([]);
  const [query, setQuery] = useState(null);

  useEffect(() => {

    TrackService.getTracks('rock')
      .then((result) => {
        setTracks(result);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);


  const getSearchQuery = value => {
    setQuery(value);
    TrackService.searchQuery(value)
      .then((result) => {
        setTracks(result);
      })
      .catch(e => {
        console.log(e);
      });
  }

  return (
    <>
      <Navbar sender={getSearchQuery} />

      <div className="container py-5">

        {query && <h4><i className="fas fa-search mb-3"></i> Search results: {query}</h4>}

        <div className="row">
          {tracks && tracks.length > 0
            ? tracks.map(track => <div className="col-md-3 mb-3" key={track.id}>
              <Card track={track} />
            </div>)
            : <Spinner />}
        </div>
      </div>

      <Player />
    </>);
}
