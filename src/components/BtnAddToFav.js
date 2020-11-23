import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

// top button (love in card): add track to list of favorite tracks (in Global state)
export default function BtnAddToFav ({ clickedTrack, clx }) {

  const favoriteTracks = useStoreState(state => state.favoriteTracks);
  const { addTrackToFavorite, removeTrackFromFavorite } = useStoreActions(actions => actions);

  const addOrRemove = (clickedTrack) => {
    if (favoriteTracks.find(t => t.id === clickedTrack.id)) {
      removeTrackFromFavorite(clickedTrack.id);
    }
    else {
      addTrackToFavorite(clickedTrack);
    }
  }

  return (<span onClick={() => { addOrRemove(clickedTrack); }} className={clx}>
    <i className={favoriteTracks.find(t => t.id === clickedTrack.id)
      ? "fas fa-heart color-orange"
      : "fas fa-heart text-muted"}>
    </i></span>
  );
}