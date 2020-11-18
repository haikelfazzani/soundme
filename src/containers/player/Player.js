import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';

import ListFavoriteTracks from './ListFavoriteTracks';
import PlayerControls from './PlayerControls';

import '../../styles/Player.css';
import timeFormat from '../../util/timeFormat';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const placeImgWave = 'https://wave.sndcdn.com/uUGj1BxQeo90_m.png';
let scPlayer = new window.Audio();

function Player () {

  const {
    currentTrackPlay,
    currentTrackIndex,
    favoriteTracks,
    currTrackTimeUpdate,
    currTrackDuration
  } = useStoreState(state => state);

  const {
    setCurrentTrackPlay,
    setCurrentTrackPlayIndx,
    setCurrTrackTimeUpdate,
    setCurrTrackDuration
  } = useStoreActions(actions => actions);

  const [showPlayer, setShowPlayer] = useState(false);
  const [settings, setSettings] = useState({ isPlaying: false, loop: false, isEnded: false });
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    function playTrack () {
      if (scPlayer.readyState >= 1) {
        scPlayer.play();
        setCurrTrackDuration(scPlayer.duration);
        setSettings({ ...settings, isPlaying: true });
      }
    }

    function updateTime () {
      setCurrTrackTimeUpdate(scPlayer.currentTime);
      if (scPlayer.currentTime >= scPlayer.duration) {
        setSettings({ ...settings, isEnded: true });
      }
    }

    if (currentTrackPlay.id) {
      scPlayer.src = currentTrackPlay.uri + '/stream?client_id=' + process.env.REACT_APP_SOUNDCLOUD_API_KEY;
      scPlayer.addEventListener('loadedmetadata', playTrack, false);
      scPlayer.addEventListener('timeupdate', updateTime, false);
    }

    return () => {
      scPlayer.removeEventListener('loadedmetadata', playTrack);
      scPlayer.removeEventListener('timeupdate', updateTime);
    }
  }, [currentTrackPlay.id]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted && favoriteTracks.length > 0) {
      let cti = 0;
      if (settings.isEnded && !settings.loop) {
        if (currentTrackIndex < favoriteTracks.length - 1) {
          cti = currentTrackIndex + 1;
          setCurrentTrackPlay(favoriteTracks[cti]);
          setCurrentTrackPlayIndx(cti);
        }
        else {
          setCurrentTrackPlay(favoriteTracks[cti]);
          setCurrentTrackPlayIndx(cti);
        }
        setSettings({ ...settings, isEnded: false });
      }
    }

    return () => { isMounted = false; }
  }, [settings.isEnded]);

  const onShowPlayer = () => { setShowPlayer(!showPlayer); };

  const onSeek = (e) => {
    scPlayer.currentTime = currTrackDuration * (e / 100);
  }

  const onShowFavorites = () => { setShowFavorites(!showFavorites); }

  if (Object.keys(currentTrackPlay).length > 2) {
    //console.log(currentTrackPlay);
    return <>
      <div className="player pulseUpOut" style={{ display: !showPlayer ? 'block' : 'none' }}>

        <button className="btn btn-warning" onClick={onShowPlayer} title="Close player">
          <i className="fas fa-minus"></i>
        </button>

        <img
          src={currentTrackPlay.waveform_url || placeImgWave}
          alt={currentTrackPlay.title || '...'}
          className="wave_url"
        />

        {showFavorites && <ListFavoriteTracks />}

        <div className="w-100 row m-0 p-0">
          <div className="col-md-3 d-flex align-items-center p-track-infos">
            <img
              src={currentTrackPlay.artwork_url}
              alt={currentTrackPlay.title}
              className="img-thumbnail mr-3"
            />
            <div className="d-flex flex-column">
              <Link to={'/user/' + currentTrackPlay.user.id} className="text-truncate text-white fs-14">{currentTrackPlay.title}</Link>
              <div className="fs-12 text-muted">{currentTrackPlay.user.username}</div>
            </div>
          </div>

          <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
            {scPlayer && <PlayerControls
              scPlayer={scPlayer}
              settings={settings}
              setSettings={setSettings}
            />}

            <div className="w-100 d-flex align-items-center mt-2">
              <span className="fs-12 mr-2">{timeFormat(currTrackTimeUpdate)}</span>
              <Slider onChange={onSeek} value={(currTrackTimeUpdate / currTrackDuration) * 100} />
              <span className="fs-12 ml-2">{timeFormat(currTrackDuration)}</span>
            </div>
          </div>

          <div className="col-md-3 d-flex justify-content-end align-items-center">
            <button className="btn btn-dark" onClick={onShowFavorites}><i className="fa fa-list"></i></button>
          </div>

        </div>
      </div>



      <div className="headphones"
        style={{ display: showPlayer ? 'flex' : 'none' }}
        onClick={onShowPlayer} data-toggle="tooltip" data-placement="top" title="Open player">
        <i className="fas fa-play-circle"></i>
      </div>
    </>
  }
  else {
    return <></>;
  }
}

export default Player;