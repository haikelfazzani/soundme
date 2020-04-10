import React, { useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

export default function PlayerControls ({ scPlayer, settings, setSettings }) {

  const { currentTrackIndex, favoriteTracks } = useStoreState(state => state);
  const { setCurrentTrackPlay, setCurrentTrackPlayIndx } = useStoreActions(actions => actions);

  const [volume, setVolume] = useState(1);

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

      case 'loop':
        setSettings({ ...settings, loop: !settings.loop });
        scPlayer.loop = !settings.loop;
        break;

      case 'volume':
        scPlayer.volume = scPlayer.volume === 1 ? 0 : 1;
        setVolume(scPlayer.volume);
        break;

      case 'next':
        let cti = 0;
        if (currentTrackIndex < favoriteTracks.length - 1) {
          cti = currentTrackIndex + 1;
          setCurrentTrackPlay(favoriteTracks[cti]);
          setCurrentTrackPlayIndx(cti);
        }
        else {
          setCurrentTrackPlay(favoriteTracks[cti]);
          setCurrentTrackPlayIndx(cti);
        }
        break;

      case 'previous':
        let cnt = favoriteTracks.length - 1;
        if (currentTrackIndex > 0) {
          cnt = currentTrackIndex - 1;
          setCurrentTrackPlay(favoriteTracks[cnt]);
          setCurrentTrackPlayIndx(cnt);
        }
        else {
          setCurrentTrackPlay(favoriteTracks[cnt]);
          setCurrentTrackPlayIndx(cnt);
        }
        break;

      default:
        break;
    }
  }

  return (
    <ul className="controls">

      <li onClick={() => { onControls('loop'); }}>
        <i className="fas fa-sync" style={{ color: settings.loop ? '#ddd' : '#fff' }}></i>
      </li>

      <li onClick={() => { onControls('previous'); }}>
        <i className="fas fa-step-backward"></i>
      </li>

      <li onClick={() => { onControls(!settings.isPlaying ? 'play' : 'pause'); }}>
        <i className={!settings.isPlaying
          ? "far fa-play-circle fs-34"
          : "far fa-pause-circle fs-34"}>
        </i>
      </li>

      <li onClick={() => { onControls('next'); }}>
        <i className="fas fa-step-forward"></i>
      </li>

      <li onClick={() => { onControls('volume'); }}>
        <i className={"fas " + (volume === 0 ? "fa-volume-mute" : "fa-volume-up")}></i>
      </li>

    </ul>
  );
}