import React, { useState, useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';

import Img from '../../components/Img';
import '../../styles/CardHorizontal.css';

export default function CardHorizontal ({ track, data }) {

  const setCurrentTrackPlay = useStoreActions(actions => actions.setCurrentTrackPlay);
  const { currentTrackPlay, currTrackTimeUpdate, currTrackDuration } = useStoreState(state => state);
  const [isPlaying, setIsPlayin] = useState(false);

  useEffect(() => {
    setIsPlayin(currentTrackPlay.title === track.title);
  }, [currentTrackPlay.title]);

  return (
    <div className="card card-horizontal mb-3 py-3 pr-3 pl-3"
      style={{
        background: `linear-gradient(rgba(23, 27, 29, 0.85), rgba(18, 19, 20, 0.97)), url(${track.waveform_url})`
      }}>

      {currentTrackPlay.id && currentTrackPlay.id === track.id
        && <div
          className="h-100"
          style={{
            width: ((currTrackTimeUpdate * 100 / currTrackDuration) || 0) + '%',
            background: 'rgba(255, 255, 255, 0.60)',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: -1
          }}>
        </div>}

      <div className="row no-gutters">
        <div className="col-md-2 disp-none img-track" onClick={() => { setCurrentTrackPlay(track); }}>
          <span><i className={"fa fa-" + (isPlaying ? 'music' : 'play')}></i></span>
          <Img
            src={track.artwork_url ? track.artwork_url.replace('large.jpg', 't500x500.jpg') : null}
            alt={track.title}
            clx="img-fluid rounded-circle"
          />
        </div>
        <div className="col-md-10">
          <div className="d-flex flex-column ml-3">
            <h5 className="card-title color-orange"><i className="fa fa-music"></i> {track.title}</h5>
            <p className="card-text">{track.description || 'No description..'}</p>
            <p className="card-text"><small className="text-muted">@{track.user.username} ({track.genre})</small></p>

            <div className="w-100 d-flex flex-wrap">
              {data.map(g => <span
                className="badge badge-dark mr-3 text-uppercase py-2 pr-2 pl-2 font-weight-normal lsp2 mb-2"
                key={g.icon}><i className={g.icon}></i> {g.data}
              </span>)}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}