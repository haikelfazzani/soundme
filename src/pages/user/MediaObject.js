import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import GlobalContext from '../../providers/GlobalContext';

import Img from '../../components/Img';
import BtnAddToFav from '../../components/BtnAddToFav';

import formatNum from '../../util/formatNum';

import '../../styles/MediaObject.css';

// duration: 235331 - tag_list: "Space rap Electronic" - waveform_url - user.avatar_url
// Page User: MediaObject for track list 
export default function MediaObject ({ track, active }) {

  const { state, setState } = useContext(GlobalContext);

  const playTrack = (track) => {
    setState({ ...state, currentTrackPlay: track });
  }

  return (
    <div className={"card card-inline h-100 " + (active ? "" : "active-card")}>
      <div className="row no-gutters">
        <div className="col-md-3">

          <div onClick={() => { playTrack(track); }} className="img-flip">
            <div className="fadeIn">
              {active ? <i className="fas fa-play fs-18"></i> : <i className="fas fa-music fs-18"></i>}
            </div>

            <Img
              src={track.artwork_url}
              clx="img-header"
              alt={track.title}
            />
          </div>

        </div>

        <div className="col-md-9 pl-2 flex-column">
          <Link to={'/track/' + track.id} className="card-title text-wrap w-90">{track.title}</Link>
          <p className="card-text text-truncate m-0">@{track.user.username}</p>

          <span className="fs-12 color-gray">{track.genre}</span>

          <BtnAddToFav clickedTrack={track} clx="card-btn-add-fav" />

        </div>
      </div>

      <div className="card-footer mt-1">
        <span><i className="fas fa-play"></i> <small>{formatNum(track.playback_count)}</small></span>
        <span><i className="fas fa-thumbs-up"></i> <small>{formatNum(track.favoritings_count)}</small></span>
        <span><i className="fas fa-comments"></i> <small>{formatNum(track.comment_count)}</small></span>
        <span><i className="fas fa-share"></i> <small>{formatNum(track.reposts_count)}</small></span>
      </div>
    </div>
  );
}