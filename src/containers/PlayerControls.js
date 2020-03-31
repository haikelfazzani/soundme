import React, { useState } from 'react';
import timeFormat from '../util/timeFormat';

export default function PlayerControls ({ scPlayer, settings, setSettings, timeupdate, trackDuration }) {

  const [volume, setVolume] = useState(100);

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

      case 'loop':
        setSettings({ ...settings, loop: !settings.loop });
        scPlayer.loop = !settings.loop;
        break;

      default:
        break;
    }
  }

  const onVolume = (e) => {
    setVolume(e.target.value);
    scPlayer.volume = (e.target.value / 100);
  }

  return (
    <ul className="controls">
      <li onClick={() => { onControls(!settings.isPlaying ? 'play' : 'pause'); }}>
        <i className={!settings.isPlaying ? "fas fa-play" : "fas fa-pause"}></i>
      </li>

      <li onClick={() => { onControls('stop'); }}><i className="fas fa-stop"></i></li>

      <li onClick={() => { onControls('loop'); }}>
        {settings.loop
          ? <i className="fas fa-long-arrow-alt-right"></i>
          : <i className="fas fa-undo-alt"></i>}
      </li>     

      <li className="fs-12"> {timeFormat(timeupdate) + ' / ' + timeFormat(trackDuration)}</li> 

      <li>
        <input type="range"
          className="custom-range"
          id="customRange1"
          min="0"
          max="100"
          onChange={onVolume}
          value={volume}
          style={{ 'height': '0.7rem', maxWidth:'80px' }}
        />
      </li>      
          
    </ul>
  );
}