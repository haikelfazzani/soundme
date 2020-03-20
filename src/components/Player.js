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

  const { state, setState } = useContext(GlobalContext);
  const [player, setPlayer] = useState();
  const [trackDuration, setTrackDuration] = useState(0);
  const [timeupdate, setTimeUpdate] = useState(0);
  const [settings, setSettings] = useState({
    isPlaying: false,
    isMuted: 1,
    showPlayer: false,
    currTrackId: 0,
  });

  useEffect(() => {
    if (state.currentTrackPlay && Object.keys(state.currentTrackPlay).length > 0) {
      window.SC.stream('/tracks/' + state.currentTrackPlay.id)
        .then(function (playr) {
          setPlayer(playr);
          setSettings({
            ...settings,
            isPlaying: true,
            showPlayer: true,
            currTrackId: state.currentTrackPlay.id
          });
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

  const onClickTrackList = (track) => {
    setState({ ...state, currentTrackPlay: track });
    scPlayer.play({ streamUrl: `https://api.soundcloud.com/tracks/${track.id}/stream` });
  }

  const rmFavoriteTrack = (trackId) => {
    let tracks = state.favoriteTracks;

    setState({
      ...state,
      favoriteTracks: [...tracks.filter(t => t.id !== trackId)]
    });
  }

  const onHidePlayer = () => { setSettings({ ...settings, showPlayer: !settings.showPlayer }); }

  return <>
    <div className="player pulseUpOut pb-0" style={{ display: settings.showPlayer ? 'flex' : 'none' }}>

      <button className="btn-hide-player" onClick={onHidePlayer} data-toggle="tooltip" data-placement="top" title="Close player">
        <i className="fas fa-minus"></i>
        </button>

      <div className="container w-100 d-flex justify-content-between mb-2">
        <img src={state.currentTrackPlay && state.currentTrackPlay.artwork_url
          ? state.currentTrackPlay.artwork_url : placeImg} className="w-25 mr-2" alt="..."
        />

        <div className="w-75 d-flex flex-column">
          <h5 className="m-0 fs-14">{state.currentTrackPlay.title || '...'}</h5>
          <p className="m-0 text-muted fs-12">{state.currentTrackPlay.user ? state.currentTrackPlay.user.username : '...'}</p>

          <div className="controls mb-2 mt-2">
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

        </div>
      </div>

      <div className="seek">
        <div style={{ width: (parseInt((timeupdate * 100) / trackDuration) || 0) + '%' }}></div>
      </div>


      {state.favoriteTracks.length > 0
        && <ul className="list-group list-group-flush list-traks-fav">
          {state.favoriteTracks.map(track => <li key={track.id} className={
            settings.currTrackId !== track.id ? "list-group-item pr-2" : "list-group-item active-track pr-2"}>

            <div className="d-flex align-items-center w-75" onClick={() => { onClickTrackList(track); }}>
              <img src={track && track.artwork_url ? track.artwork_url : placeImg} alt="..." className="m-3" />
              <div>
                <h5 className="m-0 text-wrap">{track.title}</h5>
                <p className="card-text text-muted text-wrap m-0">{track.user.username}</p>
              </div>
            </div>

            <div className="w-25 d-flex justify-content-end">
              <span className="badge badge-dark fs-12 mr-2">{timeFormat(track.duration / 1000)}</span>
              <span className="badge badge-danger fs-12" onClick={() => { rmFavoriteTrack(track.id) }}><i className="fas fa-trash"></i></span>
            </div>

          </li>)}
        </ul>}

    </div>

    <div className="headphones"
      style={{ display: !settings.showPlayer ? 'flex' : 'none' }}
      onClick={onHidePlayer} data-toggle="tooltip" data-placement="top" title="Open player">
      <i className="fas fa-play-circle"></i>
    </div>
  </>;
}