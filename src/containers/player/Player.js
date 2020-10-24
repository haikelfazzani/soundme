import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';

import ListFavoriteTracks from './ListFavoriteTracks';
import PlayerControls from './PlayerControls';

import '../../styles/Player.css';

import placeImg from '../../img/1.png';
import timeFormat from '../../util/timeFormat';

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

  // current track plays image: background image for the player
  const [trackImg, setTrackImg] = useState(placeImg);

  const [settings, setSettings] = useState({ isPlaying: false, loop: false, isEnded: false });

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

    if (isMounted && currentTrackPlay.id) {
      let imgUrl = '';

      imgUrl = currentTrackPlay.artwork_url
        ? currentTrackPlay.artwork_url.replace('large.jpg', 't500x500.jpg')
        : placeImg;

      setTrackImg(`linear-gradient(rgba(23, 27, 29, 0.8), rgba(18, 19, 20, 0.92)),url(${imgUrl})`);
    }

    return () => { isMounted = false; }
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
    let rect = e.target.getBoundingClientRect();
    let cursorPosition = e.clientX - rect.left;
    let widthInPerc = ((cursorPosition * 100) / 340);

    scPlayer.currentTime = ((currTrackDuration * widthInPerc) / 100);
  }

  return <>
    {Object.keys(currentTrackPlay).length > 2
      && <div className="player pulseUpOut"
        style={{ display: !showPlayer ? 'flex' : 'none', backgroundImage: trackImg }}>

        <button className="btn-hide-player" onClick={onShowPlayer} data-toggle="tooltip" data-placement="top" title="Close player">
          <i className="fas fa-minus"></i>
        </button>

        <div>
          <h5 className="w-75 fs-14 text-wrap text-center mx-auto">
            <Link to={'/user/' + currentTrackPlay.user.id}>{currentTrackPlay.title || '...'}</Link>
          </h5>

          <div className="w-100 d-flex justify-content-center align-items-center fs-12 mb-2">
            <span>{timeFormat(currTrackTimeUpdate)}</span>
            <i className="fas fa-signature mr-2 ml-2"></i>
            <span>{timeFormat(currTrackDuration)}</span>
          </div>

          <div className="wave_url" onMouseDown={onSeek}>
            <img
              src={currentTrackPlay.waveform_url || placeImgWave}
              alt={currentTrackPlay.title || '...'}
            />
            <div style={{ width: ((currTrackTimeUpdate * 100 / currTrackDuration) || 0) + '%' }}></div>
          </div>

          {scPlayer && <PlayerControls
            scPlayer={scPlayer}
            settings={settings}
            setSettings={setSettings}
          />}

          <ListFavoriteTracks />
        </div>

      </div>}

    <div className="headphones"
      style={{ display: showPlayer ? 'flex' : 'none' }}
      onClick={onShowPlayer} data-toggle="tooltip" data-placement="top" title="Open player">
      <i className="fas fa-play-circle"></i>
    </div>
  </>;
}

export default Player;