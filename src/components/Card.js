import React from 'react';
import { useStoreActions } from 'easy-peasy';
import { Link } from 'react-router-dom';

import BtnAddToFav from './BtnAddToFav';

import '../styles/Card.css';

import Img from './Img';
import formatNum from '../util/formatNum';

export default function Card ({ track, active = false }) {

  const setCurrentTrackPlay = useStoreActions(actions => actions.setCurrentTrackPlay);

  return <div className={active ? "card h-100" : "card h-100 active-card"}>

    <div onClick={() => { setCurrentTrackPlay(track); }} className="img-flip">
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
        <Link to={'/track/' + track.user.id + '/' + track.id} className="card-title m-0 text-truncate">
          {track.title}
        </Link>

        <div className="w-100 d-flex justify-content-between align-items-center">

          <Link to={"/user/" + track.user.id} className="card-text m-0 text-muted text-truncate">
            @{track.user.username}
          </Link>

          <BtnAddToFav clickedTrack={track} />
        </div>
      </div>

    </div>

    {parseInt(track.playback_count, 10) > 0
      ? <div className="card-footer mt-1">
        <span><i className="fas fa-play"></i> <small>{formatNum(track.playback_count)}</small></span>
        <span><i className="fas fa-thumbs-up"></i> <small>{formatNum(track.favoritings_count)}</small></span>
        <span><i className="fas fa-comments"></i> <small>{formatNum(track.comment_count)}</small></span>
        <span><i className="fas fa-share"></i> <small>{formatNum(track.reposts_count)}</small></span>
      </div>
      : <div className="pb-1"></div>}
  </div>;
}