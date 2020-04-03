import React from 'react';
import formatNum from '../util/formatNum';
import timeFormat from '../util/timeFormat';
import Img from './Img';

import '../styles/CardHorizontal.css';
import { useStoreActions } from 'easy-peasy';

export default function CardHorizontal ({ track, bg = "bg-dark", active = false, isList = false }) {

  const setCurrentTrackPlay = useStoreActions(actions => actions.setCurrentTrackPlay);

  return (
    <div className={"card card-horizontal mb-3 " + bg + (active ? " active-card" : "")}>
      <div className="row no-gutters">

        <div className="col-md-2 mb-1">
          <div onClick={() => { setCurrentTrackPlay(track); }} className="img-flip">
            {isList && <div className="fadeIn">
              {!active ? <i className="fas fa-play"></i> : <i className="fas fa-music"></i>}
            </div>}

            <Img
              src={track.artwork_url}
              clx="img-header"
              alt={track.title}
            />
          </div>
        </div>

        <div className="col-md-10 justify-content-between">
          <div className="card-body d-flex flex-column">
            <h5 className="card-title fs-14 m-0">{track.title}</h5>
            <p className="card-text m-0 mb-1">@{track.user.username}</p>
            <p className="card-text m-0">{track.genre}</p>
          </div>

        </div>


        <div className="card-footer fs-12 mt-1 w-100 d-flex justify-content-between">
          <span><i className="fas fa-play"></i> <small>{formatNum(track.playback_count)}</small></span>
          <span><i className="fas fa-thumbs-up"></i> <small>{formatNum(track.favoritings_count)}</small></span>
          <span><i className="fas fa-share"></i> <small>{formatNum(track.reposts_count)}</small></span>
          <span><i className="fas fa-comments"></i> <small>{track.comment_count}</small></span>
          <span><i className="fas fa-clock"></i> <small>{timeFormat(track.duration / 1024)}</small></span>
          <span><i className="fas fa-download"></i> <small>{track.download_count}</small></span>
        </div>


      </div>
    </div>
  );
}