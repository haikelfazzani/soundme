import React, { useContext } from 'react';
import GlobalContext from '../providers/GlobalContext';
import placeImg from '../img/1.png';
import timeFormat from '../util/timeFormat';

function ListFavoriteTracks () {

  const { state, setState } = useContext(GlobalContext);

  const onClickTrackList = (track, trackIndex) => {
    setState({
      ...state,
      currentTrackPlay: track,
      currentTrackIndex: trackIndex
    });
  }

  const rmFavoriteTrack = (trackId) => {
    let newList = state.favoriteTracks.filter(t => t.id !== trackId);
    setState({ ...state, favoriteTracks: newList });
  }

  return (
    <ul className="list-group list-group-flush list-traks-fav">
      {state.favoriteTracks.map((track, i) => <li key={track.id} className={
        state.currentTrackPlay.id !== track.id
          ? "list-group-item pr-2"
          : "list-group-item active-track pr-2"}>

        <div className="d-flex align-items-center w-75" onClick={() => { onClickTrackList(track, i); }}>
          <img src={track && track.artwork_url ? track.artwork_url : placeImg} alt="..." className="m-3" />
          <h5 className="m-0 text-wrap">{track.title}</h5>
        </div>

        <div className="w-25 d-flex justify-content-end">
          <span className="badge badge-dark fs-12 mr-2">{timeFormat(track.duration / 1000)}</span>
          <span className="badge badge-danger fs-12" onClick={() => { rmFavoriteTrack(track.id) }}>
            <i className="fas fa-trash"></i>
          </span>
        </div>

      </li>)}
    </ul>);
}

export default React.memo(ListFavoriteTracks);
