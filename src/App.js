import React, { useEffect, useState } from 'react';
import './App.css';
import TrackService from './services/TrackService';

import Card from './components/Card';
import Navbar from './components/Navbar';

export default function App () {

  const [playr, setPlayr] = useState();
  const [tracks, setTracks] = useState([]);

  useEffect(() => {

    TrackService.searchQuery('keny arkana')
      .then((result) => {
        setTracks(result);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  return (
    <>
    <Navbar />
    <div className="container py-5">
      <div className="row">
        {tracks && tracks.map(track => <div className="col-md-3 mb-3" key={track.id}>

          <Card track={track} />

        </div>)}
      </div>
    </div>
  </>);
}
