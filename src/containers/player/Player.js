import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';

import ListFavoriteTracks from './ListFavoriteTracks';
import PlayerControls from './PlayerControls';

import '../../styles/Player.css';

import placeImg from '../../img/1.png';

const placeImgWave = 'https://wave.sndcdn.com/uUGj1BxQeo90_m.png';

const API_KEY = '/stream?client_id=08f79801a998c381762ec5b15e4914d5';
let scPlayer = new window.Audio();

function Player () {

  const { currentTrackPlay, currentTrackIndex, favoriteTracks } = useStoreState(state => state);
  const { setCurrentTrackPlay, setCurrentTrackPlayIndx } = useStoreActions(actions => actions);

  const [trackDuration, setTrackDuration] = useState(0);
  const [timeupdate, setTimeUpdate] = useState(0);
  const [showPlayer, setShowPlayer] = useState(false);

  // current track plays image: background image for the player
  const [trackImg, setTrackImg] = useState(placeImg);

  const [settings, setSettings] = useState({ isPlaying: false, loop: false, isEnded: false });

  useEffect(() => {
    function playTrack () {
      if (scPlayer.readyState >= 1) {
        scPlayer.play();
        setTrackDuration(scPlayer.duration);
        setSettings({ ...settings, isPlaying: true });
      }
    }

    function updateTime () {
      setTimeUpdate(scPlayer.currentTime);
      if (scPlayer.currentTime >= scPlayer.duration) {
        setSettings({ ...settings, isEnded: true });
      }
    }

    if (currentTrackPlay.id) {
      scPlayer.src = currentTrackPlay.uri + API_KEY;
      scPlayer.addEventListener('loadedmetadata', playTrack, false);
      scPlayer.addEventListener('timeupdate', updateTime, false);
    }

    return () => {
      scPlayer.removeEventListener('loadedmetadata', playTrack);
      scPlayer.removeEventListener('timeupdate', updateTime);
    }
  }, [currentTrackPlay.id]);

  useEffect(() => {
    if (currentTrackPlay.id) {
      let imgUrl = '';

      imgUrl = currentTrackPlay.artwork_url
        ? currentTrackPlay.artwork_url.replace('large.jpg', 't500x500.jpg')
        : placeImg;

      setTrackImg(`linear-gradient(rgba(23, 27, 29, 0.8), rgba(18, 19, 20, 0.92)),url(${imgUrl})`);
    }
  }, [currentTrackPlay.id]);

  useEffect(() => {
    if (favoriteTracks.length > 0) {
      if (settings.isEnded && !settings.loop) {

        if (currentTrackIndex < favoriteTracks.length - 1) {
          let ctx = currentTrackIndex + 1;
          setCurrentTrackPlay(favoriteTracks[ctx]);
          setCurrentTrackPlayIndx(ctx);
        }
        else {
          setCurrentTrackPlay(favoriteTracks[0]);
          setCurrentTrackPlayIndx(0);
        }
        setSettings({ ...settings, isEnded: false });
      }
    }
  }, [settings.isEnded]);

  const onShowPlayer = () => { setShowPlayer(!showPlayer); };

  const onSeek = (e) => {
    var rect = e.target.getBoundingClientRect();
    var cursorPosition = e.clientX - rect.left;
    var widthInPerc = ((cursorPosition * 100) / 340);

    scPlayer.currentTime = ((trackDuration * widthInPerc) / 100);
  }

  return <>
    {Object.keys(currentTrackPlay).length > 2 && <div className="player pulseUpOut"
      style={{ display: !showPlayer ? 'flex' : 'none', backgroundImage: trackImg }}>

      <button className="btn-hide-player" onClick={onShowPlayer} data-toggle="tooltip" data-placement="top" title="Close player">
        <i className="fas fa-minus"></i>
      </button>

      <div>

        <div className="w-100 text-center py-2">
          <h5 className="m-0 text-wrap">
            <Link to={'/user/' + currentTrackPlay.user.id}>
              {currentTrackPlay.title || '...'}
            </Link>
          </h5>
          <p className="m-0 text-muted fs-12">{currentTrackPlay.genre}</p>
        </div>

        {scPlayer && <PlayerControls
          scPlayer={scPlayer}
          settings={settings}
          setSettings={setSettings}
          timeupdate={timeupdate}
          trackDuration={trackDuration}
        />}

        <div className="wave_url" onMouseDown={onSeek}>
          <img
            src={currentTrackPlay.waveform_url || placeImgWave}
            alt={currentTrackPlay.title || '...'}
          />
          <div style={{ width: ((timeupdate * 100 / trackDuration) || 0) + '%' }}></div>
        </div>

        <ListFavoriteTracks />
      </div>
    </div>

    }

    <div className="headphones"
      style={{ display: showPlayer ? 'flex' : 'none' }}
      onClick={onShowPlayer} data-toggle="tooltip" data-placement="top" title="Open player">
      <i className="fas fa-play-circle"></i>
    </div>
  </>;
}

export default Player;