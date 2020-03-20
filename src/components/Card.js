import React, { useContext } from 'react';
import '../styles/Card.css';
import placeImg from '../img/1.png';
import GlobalContext from '../providers/GlobalContext';

export default function Card ({ track, active = false }) {

  const { state, setState } = useContext(GlobalContext);

  const playTrack = (track) => {
    console.log(track);
    
    setState({
      ...state,
      currentTrackPlay: track,
      isPlaying: true
    });
  }

  const addToFavorite = (track) => {
    let tracks = state.favoriteTracks;

    if (!tracks.some(t => t.id === track.id)) {
      setState({
        ...state,
        favoriteTracks: [track, ...state.favoriteTracks]
      });
    }
  }

  return <div className="card h-100">

    <div onClick={() => { playTrack(track); }} className="img-flip">
      <div className="fadeIn">
        {active
          ? <i className="fas fa-play"></i>
          : <i className="fas fa-music"></i>}
      </div>
      <img src={track.artwork_url || placeImg} className="img-header" alt="..." />
    </div>

    <div className="card-body d-flex justify-content-between">
      <div className="w-90 d-flex">
        <img src={track.user.avatar_url} className="mr-2" alt="..." />
        <div>
          <h5 className="card-title m-0">{track.title}</h5>
          <p className="card-text m-0">{track.user.username}</p>
        </div>
      </div>
      <span onClick={() => { addToFavorite(track) }} className="w-10 d-flex justify-content-end">
        <i className={state.favoriteTracks.find(t => t.id === track.id)
          ? "fas fa-heart color-rose"
          : "fas fa-heart"}>
        </i>
      </span>
    </div>
  </div>;
}