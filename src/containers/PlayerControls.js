import React from 'react';
import timeFormat from '../util/timeFormat';

export default function PlayerControls ({ scPlayer, settings, setSettings, timeupdate, trackDuration }) {

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

  return (
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

      <li> {timeFormat(timeupdate) + '/' + timeFormat(trackDuration)}</li>
    </ul>
  );
}