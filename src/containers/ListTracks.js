import React, { useContext } from 'react';
import GlobalContext from '../providers/GlobalContext';

import Card from '../components/Card';
import Skeleton from '../components/Skeleton';
import Spinner from '../components/Spinner';

export default function ListTracks ({ tracks }) {

  const { state } = useContext(GlobalContext);

  return (
    <div className="container py-4 min-vh-100">
      <div className="row">
        {tracks && tracks.length > 0
          ? tracks.map((track, i) => <div className="col-md-3 mb-3" key={track.id}>
            {(state.currentTrackPlay && state.currentTrackPlay.id === track.id)
              ? <Card track={track} />
              : <Card track={track} active={true} />}
          </div>)
          : <div className="container">
            <Skeleton />
            <Spinner />
          </div>}
      </div>
    </div>
  );
}