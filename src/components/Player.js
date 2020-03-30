import React, { useEffect, useContext, useState } from 'react';
import GlobalContext from '../providers/GlobalContext';
import '../styles/Player.css';

import placeImg from '../img/1.png';

const API_KEY = '/stream?client_id=08f79801a998c381762ec5b15e4914d5';
let scPlayer = new window.Audio();

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

function Player () {

  const { state, setState } = useContext(GlobalContext);

  const [trackDuration, setTrackDuration] = useState(0);
  const [timeupdate, setTimeUpdate] = useState(0);
  const [showPlayer, setShowPlayer] = useState(false);

  const [settings, setSettings] = useState({ isPlaying: false, loop: false, isEnded: false });

  useEffect(() => {
    scPlayer.src = state.currentTrackPlay.uri + API_KEY;

    function playTrack () {
      if (scPlayer.readyState >= 1) {
        scPlayer.play();
        setTrackDuration(scPlayer.duration);
      }
    }

    function updateTime () {
      setTimeUpdate(scPlayer.currentTime);

      if (scPlayer.currentTime >= scPlayer.duration) {
        setSettings({ ...settings, isEnded: true });
      }
    }

    if (state.currentTrackPlay.id) {
      scPlayer.addEventListener('loadedmetadata', playTrack, false);
      scPlayer.addEventListener('timeupdate', updateTime, false);
    }

    return () => {
      scPlayer.removeEventListener('loadedmetadata', playTrack);
      scPlayer.removeEventListener('timeupdate', updateTime);
    }
  }, [state.currentTrackPlay.id]);

  useEffect(() => {

    if (settings.isEnded && !settings.loop) {
      console.log(state.currentTrackIndex + 1);

      if (state.currentTrackIndex < state.favoriteTracks.length - 1) {
        setState({
          ...state,
          currentTrackPlay: state.favoriteTracks[state.currentTrackIndex + 1],
          currentTrackIndex: state.currentTrackIndex + 1
        });
      }
      else {
        setState({
          ...state,
          currentTrackPlay: state.favoriteTracks[0],
          currentTrackIndex: 0
        });
      }
      setSettings({ ...settings, isEnded: false });
    }
  }, [settings.isEnded]);

  const onControls = (control) => {
    switch (control) {
      case 'play':
        setSettings({ ...settings, isPlaying: true });
        scPlayer.play();
        break;

      case 'pause':
        setSettings({ ...settings, isPlaying: false });
        scPlayer.pause();
        break;

      case 'stop':
        setSettings({ ...settings, isPlaying: false });
        scPlayer.pause();
        scPlayer.currentTime = 0
        break;

      case 'muted':
        scPlayer.muted = !scPlayer.muted;
        break;

      case 'loop':
        setSettings({ ...settings, loop: !settings.loop });
        scPlayer.loop = !settings.loop;
        break;

      default:
        break;
    }
  }

  const onClickTrackList = (track, trackIndex) => {
    setState({
      ...state,
      currentTrackPlay: track,
      currentTrackIndex: trackIndex
    });
  }

  const rmFavoriteTrack = (trackId) => {
    let newList = state.favoriteTracks.filter(t => t.id !== trackId);
    setState({ ...state, favoriteTracks: newList });
  }

  const onShowPlayer = () => { setShowPlayer(!showPlayer) }

  return <>
    <div className="player pulseUpOut pb-0" style={{ display: !showPlayer ? 'flex' : 'none' }}>

      <button className="btn-hide-player" onClick={onShowPlayer} data-toggle="tooltip" data-placement="top" title="Close player">
        <i className="fas fa-minus"></i>
      </button>

      <div className="w-100 d-flex">
        <img src={state.currentTrackPlay
          && state.currentTrackPlay.artwork_url
          ? state.currentTrackPlay.artwork_url : placeImg}
          className="mr-2"
          alt={state.currentTrackPlay.title || '...'}
        />

        <div className="py-2">
          <h5 className="m-0 fs-14 w-75">{state.currentTrackPlay.title || '...'}</h5>
          <p className="m-0 text-muted fs-12">
            {state.currentTrackPlay.user
              ? '@' + state.currentTrackPlay.user.username
              : '...'}
          </p>
        </div>
      </div>

      <ul className="controls">
        <li onClick={() => { onControls(!settings.isPlaying ? 'play' : 'pause'); }}>
          <i className={!settings.isPlaying ? "fas fa-play" : "fas fa-pause"}></i>
        </li>

        <li onClick={() => { onControls('stop'); }}><i className="fas fa-stop"></i></li>

        <li onClick={() => { onControls('loop'); }}>
          {settings.loop ? <i className="fas fa-long-arrow-alt-right"></i> : <i className="fas fa-undo-alt"></i>}
        </li>

        <li onClick={() => { onControls('muted'); }}>
          <i className={settings.isMuted === 0 ? "fas fa-volume-mute" : "fas fa-volume-up"}></i>
        </li>

        <li>
          {timeFormat(timeupdate) + '/' + timeFormat(trackDuration)}
        </li>
      </ul>

      <div className="seek">
        <div style={{ width: ((timeupdate * 100 / trackDuration) || 0) + '%' }}></div>
      </div>


      {state.favoriteTracks.length > 0
        && <ul className="list-group list-group-flush list-traks-fav">
          {state.favoriteTracks.map((track, i) => <li key={track.id} className={
            state.currentTrackPlay.id !== track.id
              ? "list-group-item pr-2"
              : "list-group-item active-track pr-2"}>

            <div className="d-flex align-items-center w-75" onClick={() => { onClickTrackList(track, i); }}>
              <img src={track && track.artwork_url ? track.artwork_url : placeImg} alt="..." className="m-3" />
                <h5 className="m-0 text-wrap">{track.title}</h5>
            </div>

            <div className="w-25 d-flex justify-content-end">
              <span className="badge badge-dark fs-12 mr-2">{timeFormat(track.duration / 1000)}</span>
              <span className="badge badge-danger fs-12" onClick={() => { rmFavoriteTrack(track.id) }}><i className="fas fa-trash"></i></span>
            </div>

          </li>)}
        </ul>}

    </div>

    <div className="headphones"
      style={{ display: showPlayer ? 'flex' : 'none' }}
      onClick={onShowPlayer} data-toggle="tooltip" data-placement="top" title="Open player">
      <i className="fas fa-play-circle"></i>
    </div>
  </>;
}

export default React.memo(Player);