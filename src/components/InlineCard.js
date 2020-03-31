import React, { useContext } from 'react';
import GlobalContext from '../providers/GlobalContext';

import '../styles/InlineCard.css';

import placeImg from '../img/1.png';
import formatNum from '../util/formatNum';

// duration: 235331 - tag_list: "Space rap Electronic" - waveform_url - user.avatar_url
export default function InlineCard ({ track, active }) {

  const { state, setState } = useContext(GlobalContext);

  const playTrack = (track) => {
    setState({ ...state, currentTrackPlay: track });
  }

  const addToFavorite = (track) => {
    let tracks = state.favoriteTracks;

    if (!tracks.some(t => t.id === track.id)) {
      setState({ ...state, favoriteTracks: [track, ...state.favoriteTracks] });
    }
  }

  return (
    <div className={"card card-inline h-100 " + (active ? "" : "active-card")}>
      <div className="row no-gutters">
        <div className="col-md-2">

          <div onClick={() => { playTrack(track); }} className="img-flip">
            <div className="fadeIn">
              {active ? <i className="fas fa-play fs-14"></i> : <i className="fas fa-music fs-14"></i>}
            </div>

            <img
              src={track.artwork_url
                ? track.artwork_url.replace('large.jpg', 't300x300.jpg')
                : placeImg}
              className="img-header"
              alt={track.title}
            />
          </div>

        </div>
        <div className="col-md-10 pl-2 flex-column">
          <h5 className="card-title text-truncate w-75 mb-0">{track.title}</h5>
          <p className="card-text text-truncate mt-0">@{track.user.username}</p>
          <span onClick={() => { addToFavorite(track) }} className="card-btn-add-fav">
            <i className={state.favoriteTracks.find(t => t.id === track.id)
              ? "fas fa-heart color-rose"
              : "fas fa-heart text-muted"}>
            </i>
          </span>
        </div>
      </div>

      <div className="card-footer mt-1">
        <span className="fs-12"><i className="fas fa-play"></i> {formatNum(track.playback_count)}</span>
        <span className="fs-12"><i className="fas fa-thumbs-up"></i> {formatNum(track.favoritings_count)}</span>
        <span className="fs-12"><i className="fas fa-download"></i> {track.download_count}</span>
        <span className="fs-12"><i className="fas fa-share"></i> {formatNum(track.reposts_count)}</span>
        <span className="fs-12"><i className="fas fa-comments"></i> {track.comment_count}</span>
      </div>
    </div>
  );
}