import React, { useEffect, useContext, useState } from 'react';
import GlobalContext from '../providers/GlobalContext';
import '../styles/Player.css';

import placeImg from '../img/1.png';

let scPlayer = new window.SoundCloudAudio('08f79801a998c381762ec5b15e4914d5');

function timeFormat (time) {
  let hrs = ~~(time / 3600);
  let mins = ~~((time % 3600) / 60);
  let secs = ~~time % 60;
  let ret = "";

  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
}

export default function Player () {

  const { state } = useContext(GlobalContext);
  const [player, setPlayer] = useState();
  const [trackDuration, setTrackDuration] = useState(0);
  const [timeupdate, setTimeUpdate] = useState(0);
  const [settings, setSettings] = useState({
    isPlaying: false,
    isMuted: 1,
    showPlayer: false
  });

  useEffect(() => {
    if (state.currentTrackPlay && Object.keys(state.currentTrackPlay).length > 0) {
      window.SC.stream('/tracks/' + state.currentTrackPlay.id)
        .then(function (playr) {
          setPlayer(playr);
          setSettings({ ...settings, isPlaying: true, showPlayer: true });
          setTrackDuration(parseInt((state.currentTrackPlay.duration - 50) / 1000));
        });

      scPlayer.play({
        streamUrl: `https://api.soundcloud.com/tracks/${state.currentTrackPlay.id}/stream`
      });

      scPlayer.on('timeupdate', function () {
        setTimeUpdate(parseInt(scPlayer.audio.currentTime));
      });
    }

  }, [state.currentTrackPlay.id]);

  const onControls = (control) => {
    switch (control) {
      case 'play':
        setSettings({ ...settings, isPlaying: true });
        scPlayer.play({
          streamUrl: `https://api.soundcloud.com/tracks/${state.currentTrackPlay.id}/stream`
        });
        break;

      case 'pause':
        setSettings({ ...settings, isPlaying: false });
        scPlayer.pause();
        break;

      case 'stop':
        setSettings({ ...settings, isPlaying: false });
        scPlayer.stop();
        //scPlayer.setTime(10)
        break;

      case 'muted':
        scPlayer.setVolume(settings.isMuted === 1 ? 0 : 1);
        setSettings({ ...settings, isMuted: settings.isMuted === 1 ? 0 : 1 });
        break;

      default:
        break;
    }
  }

  return (<div className="player" style={{ display: settings.showPlayer ? 'flex' : 'none' }}>

    <div className="container w-100 d-flex flex-column justify-content-center bd-highlight">

      <div className="w-100 d-flex justify-content-between">
        <img src={state.currentTrackPlay && state.currentTrackPlay.artwork_url
          ? state.currentTrackPlay.artwork_url
          : placeImg}
          className="w-25 mr-2" alt="..."
        />

        <div className="w-75 d-flex flex-column">
          <p className="m-0 mb-2">{state.currentTrackPlay.title || '...'}</p>

          <div className="controls mb-2">
            <button onClick={() => { onControls(!settings.isPlaying ? 'play' : 'pause'); }}>
              <i className={!settings.isPlaying ? "fas fa-play" : "fas fa-pause"}></i>
            </button>

            <button onClick={() => { onControls('stop'); }}><i className="fas fa-stop"></i></button>
            <button onClick={() => { onControls('muted'); }}>
              <i className={settings.isMuted === 0 ? "fas fa-volume-mute" : "fas fa-volume-up"}></i>
            </button>

            <span className="badge badge-primary">
              {timeFormat(timeupdate) + '/' + timeFormat(trackDuration)}
            </span>
          </div>

          <div className="seek">
            <div style={{ width: parseInt((timeupdate * 100) / trackDuration) || 0 }}></div>
          </div>

        </div>
      </div>


    </div>

  </div>);
}