import React, { useContext } from 'react';
import GlobalContext from '../providers/GlobalContext';

// top button (love in card): add track to list of favorite tracks (in Global state)
export default function BtnAddToFav ({ clickedTrack, clx }) {

  const { state, setState } = useContext(GlobalContext);

  const addToFavorite = (track) => {
    let tracks = state.favoriteTracks;

    if (!tracks.some(t => t.id === track.id)) {
      setState({ ...state, favoriteTracks: [track, ...state.favoriteTracks] });
    }
  }

  return (
    <span onClick={() => { addToFavorite(clickedTrack) }} className={clx}>
      <i className={state.favoriteTracks.find(t => t.id === clickedTrack.id)
        ? "fas fa-heart color-orange"
        : "fas fa-heart text-muted"}>
      </i>
    </span>
  );
}