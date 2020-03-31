import React, { useContext } from 'react';
import '../styles/Card.css';
import placeImg from '../img/1.png';
import GlobalContext from '../providers/GlobalContext';

import loadingImg from '../img/loading.gif';

export default function Card ({ track, active = false }) {

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

  return <div className={active ? "card h-100" : "card h-100 active-card"}>

    <div onClick={() => { playTrack(track); }} className="img-flip">
      <div className="fadeIn">
        {active ? <i className="fas fa-play"></i>
          : <i className="fas fa-music"></i>}
      </div>

      <img
        src={track.artwork_url
          ? track.artwork_url.replace('large.jpg', 't300x300.jpg')
          : placeImg}
        className="img-header"
        alt="..."
      />
    </div>

    <div className="card-body">
      <img src={track.user.avatar_url} alt={track.title} />

      <div className="card-details">
        <h5 className="card-title m-0 text-truncate">{track.title}</h5>

        <div className="w-100 d-flex justify-content-between align-items-center">
          <p className="card-text m-0 text-muted text-truncate">@{track.user.username}</p>
          <span onClick={() => { addToFavorite(track) }}>
            <i className={state.favoriteTracks.find(t => t.id === track.id)
              ? "fas fa-heart color-rose"
              : "fas fa-heart text-muted"}>
            </i>
          </span>
        </div>
      </div>

    </div>
  </div>;
}