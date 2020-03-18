import React, { useEffect, useContext, useState } from 'react';
import GlobalContext from '../providers/GlobalContext';
import '../styles/Player.css';

export default function Player () {

  const { state } = useContext(GlobalContext);
  const [player, setPlayer] = useState();

  useEffect(() => {
    if (state.currentTrackPlay && Object.keys(state.currentTrackPlay).length > 0) {
      window.SC.stream('/tracks/' + state.currentTrackPlay.id)
        .then(function (playr) { setPlayer(playr); playr.play(); });
    }
  }, [state.currentTrackPlay]);

  const onPlay = () => {
    player.play();
  }

  const onPause = () => {
    player.pause();
  }

  return (<div className="player">

    <div className="container">
      <p className="m-0">{state.currentTrackPlay.title}</p>
      <button onClick={onPlay}><i className="fas fa-play"></i> Play</button>
      <button onClick={onPause}><i className="fas fa-pause"></i> Pause</button>
    </div>

  </div>);
}