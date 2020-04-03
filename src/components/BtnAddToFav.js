import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

// top button (love in card): add track to list of favorite tracks (in Global state)
export default function BtnAddToFav ({ clickedTrack, clx }) {

  const favoriteTracks = useStoreState(state => state.favoriteTracks);
  const addTrackToFavorite = useStoreActions(actions => actions.addTrackToFavorite);

  return (
    <span onClick={() => { addTrackToFavorite(clickedTrack); }} className={clx}>
      <i className={favoriteTracks.find(t => t.id === clickedTrack.id)
        ? "fas fa-heart color-orange"
        : "fas fa-heart text-muted"}>
      </i>
    </span>
  );
}