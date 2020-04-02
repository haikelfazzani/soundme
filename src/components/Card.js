import React, { useContext } from 'react';
import GlobalContext from '../providers/GlobalContext';
import { Link } from 'react-router-dom';

import Img from './Img';

import '../styles/Card.css';
import BtnAddToFav from './BtnAddToFav';

export default function Card ({ track, active = false }) {

  const { state, setState } = useContext(GlobalContext);

  const playTrack = (track) => {
    setState({ ...state, currentTrackPlay: track });
  }  

  return <div className={active ? "card h-100" : "card h-100 active-card"}>

    <div onClick={() => { playTrack(track); }} className="img-flip">
      <div className="fadeIn">
        {active ? <i className="fas fa-play"></i> : <i className="fas fa-music"></i>}
      </div>

      <Img
        src={track.artwork_url ? track.artwork_url.replace('large.jpg', 't300x300.jpg') : ''}
        clx="img-header"
        alt={track.title}
      />
    </div>

    <div className="card-body">
      <img src={track.user.avatar_url} alt={track.title} />

      <div className="card-details">
        <h5 className="card-title m-0 text-truncate">{track.title}</h5>

        <div className="w-100 d-flex justify-content-between align-items-center">

          <Link to={"/user/" + track.user.id} className="card-text m-0 text-muted text-truncate">
            @{track.user.username}
          </Link>

          <BtnAddToFav clickedTrack={track} />
        </div>
      </div>

    </div>
  </div>;
}