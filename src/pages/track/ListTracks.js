import React from 'react';
import CardHorizontal from '../../components/CardHorizontal';
import { useStoreState } from 'easy-peasy';

export default function ListTracks ({ tracks }) {

  const currentTrackPlay = useStoreState(state => state.currentTrackPlay);

  return (
    <ul className="list-group">
      {tracks.map(track => <li key={'d' + track.id}>
        {(currentTrackPlay.id && currentTrackPlay.id === track.id)
          ? <CardHorizontal track={track} active={true} isList={true} />
          : <CardHorizontal track={track} active={false} isList={true} />}
      </li>)}
    </ul>
  );
}