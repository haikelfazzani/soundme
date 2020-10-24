import React from 'react';
import { useStoreState } from 'easy-peasy';
import Card from '../components/Card';
import Skeleton from '../components/Skeleton';

// home page: list fetched tracks
export default function ListTracks ({ tracks }) {

  const currentTrackPlay = useStoreState(state => state.currentTrackPlay);

  return (
    <div className="container py-4 min-vh-100">
      <div className="row">
        {tracks && tracks.length > 0
          ? tracks.map((track, i) => <div className="col-md-3 mb-3" key={'t' + track.id + i}>
            {(currentTrackPlay.id && currentTrackPlay.id === track.id)
              ? <Card track={track} />
              : <Card track={track} active={true} />}
          </div>)
          : <div className="container"><Skeleton /></div>}
      </div>
    </div>
  );
}