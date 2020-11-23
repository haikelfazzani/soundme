import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';

import ListFavoriteTracks from './ListFavoriteTracks';
import PlayerControls from './PlayerControls';

import timeFormat from '../../util/timeFormat';
import BtnAddToFav from '../../components/BtnAddToFav';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../../styles/Player.css';

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
    return <>
      <div className="player" style={{ display: !showPlayer ? 'block' : 'none' }}>

        <div className="h-100 w-100 wave_url">
          <div style={{ width: (currTrackTimeUpdate / currTrackDuration) * 100 + '%' }}></div>
          <img
            src={currentTrackPlay.waveform_url || placeImgWave}
            alt={currentTrackPlay.title || '...'}
          />
        </div>

        {showFavorites && <ListFavoriteTracks />}

        <div className="w-100 row m-0 p-0">
          <div className="col-md-3 d-flex align-items-center p-track-infos disp-none-sm">
            <img
              src={currentTrackPlay.artwork_url}
              alt={currentTrackPlay.title}
              className="img-thumbnail mr-3"
            />
            <div className="d-flex flex-column">
              <Link to={'/track/' + currentTrackPlay.user.id + '/' + currentTrackPlay.id} className="text-truncate text-white fs-14">
                {currentTrackPlay.title}
              </Link>
              <Link to={"/user/" + currentTrackPlay.user.id} className="fs-12 text-muted">
                @{currentTrackPlay.user.username}
              </Link>
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

          <div className="col-md-3 d-flex justify-content-end align-items-center disp-none-sm">
            <button className="btn btn-outline-secondary btn-sm rounded-circle mr-3" title="Add To List Favorites"><BtnAddToFav clickedTrack={currentTrackPlay} /></button>
            <button className="btn btn-outline-secondary btn-sm rounded-circle mr-3" onClick={onShowFavorites} title="Open List Favorites"><i className="fa fa-list"></i></button>
            <button className="btn btn-outline-secondary btn-sm rounded-circle" onClick={onShowPlayer} title="Minimize Player"><i className="fas fa-minus"></i></button>
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