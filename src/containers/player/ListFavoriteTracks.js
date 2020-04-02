import React, { useContext } from 'react';
import GlobalContext from '../../providers/GlobalContext';
import timeFormat from '../../util/timeFormat';
import Img from '../../components/Img';

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
          <span className="badge fs-12" onClick={() => { rmFavoriteTrack(track.id) }}>X</span>
        </div>

      </li>)}
    </ul>
  );
}

export default ListFavoriteTracks;
