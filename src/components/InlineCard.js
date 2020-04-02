import React, { useContext } from 'react';
import GlobalContext from '../providers/GlobalContext';

import '../styles/InlineCard.css';

import placeImg from '../img/1.png';
import formatNum from '../util/formatNum';
import timeFormat from '../util/timeFormat';
import { Link } from 'react-router-dom';

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
        <div className="col-md-3">

          <div onClick={() => { playTrack(track); }} className="img-flip">
            <div className="fadeIn">
              {active ? <i className="fas fa-play fs-18"></i> : <i className="fas fa-music fs-18"></i>}
            </div>

            <img
              src={track.artwork_url ? track.artwork_url : placeImg}
              className="img-header"
              alt={track.title}
            />
          </div>

        </div>

        <div className="col-md-9 pl-2 flex-column">
          <h5 className="card-title text-wrap w-90 mb-0">
            <Link to={'/track/' + track.id}>{track.title}</Link>
          </h5>
          <p className="card-text text-truncate m-0">@{track.user.username}</p>

          <span className="fs-12 color-gray">{track.genre}</span>

          <span onClick={() => { addToFavorite(track) }} className="card-btn-add-fav">
            <i className={state.favoriteTracks.find(t => t.id === track.id)
              ? "fas fa-heart color-orange"
              : "fas fa-heart text-muted"}>
            </i>
          </span>

        </div>
      </div>

      <div className="card-footer mt-1">
        <span><i className="fas fa-play"></i> <small>{formatNum(track.playback_count)}</small></span>
        <span><i className="fas fa-thumbs-up"></i> <small>{formatNum(track.favoritings_count)}</small></span>
        <span><i className="fas fa-comments"></i> <small>{track.comment_count}</small></span>
        <span><i className="fas fa-download"></i> <small>{track.download_count}</small></span>
      </div>
    </div>
  );
}