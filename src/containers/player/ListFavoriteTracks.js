import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import timeFormat from '../../util/timeFormat';
import Img from '../../components/Img';

function ListFavoriteTracks () {

  const {
    currentTrackPlay,
    favoriteTracks
  } = useStoreState(state => state);

  const {
    setCurrentTrackPlay,
    setCurrentTrackPlayIndx,
    removeTrackFromFavorite
  } = useStoreActions(actions => actions);

  const onClickTrackList = (track, trackIndex) => {
    setCurrentTrackPlay(track);
    setCurrentTrackPlayIndx(trackIndex);
  }

  return (
    <ul className="w-100 list-group list-group-flush list-traks-fav overflow-auto">
      {favoriteTracks.map((track, i) => <li key={track.id} className={
        currentTrackPlay.id !== track.id
          ? "list-group-item pr-2"
          : "list-group-item active-track pr-2"}>

        <div className="d-flex align-items-center w-75" onClick={() => { onClickTrackList(track, i); }}>

          <Img
            src={track.artwork_url}
            alt={track.title}
            clx="mr-2"
          />

          <div>
            <h6 className="m-0 text-truncate">{track.title}</h6>
            <p className="m-0 text-wrap text-muted">@{track.user.username}</p>
          </div>
        </div>

        <div className="w-25 d-flex justify-content-end">
          <span className="fs-12 mr-2">{timeFormat(track.duration / 1000)}</span>
          <span className="badge badge-light fs-12 mr-1"
            onClick={() => { removeTrackFromFavorite(track.id); }}><i className="fa fa-times"></i></span>
        </div>

      </li>)}
    </ul>
  );
}

export default React.memo(ListFavoriteTracks);