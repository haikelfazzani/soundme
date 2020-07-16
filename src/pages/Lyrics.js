import React, { useState, useEffect } from 'react';
import LyricsService from '../services/LyricsSercice';
import SkeletonLyrics from '../components/SkeletonLyrics';

import '../styles/Lyrics.css';

let audio = new Audio();

export default function Lyrics () {

  const [lyricState, setLyricState] = useState({ artist: '', songname: '', lyric: null, infos: {} });
  const [previewTime, setPreviewTime] = useState(30);

  useEffect(() => {
    setTimeout(() => {
      let local = localStorage.getItem('lyrics-search');

      if (local) {
        let v = JSON.parse(local);
        setLyricState({ artist: v.artist, songname: v.songname, lyric: v.lyric, infos: v.infos });
      }
      else {
        LyricsService.getLyric('linkin park', 'numb')
          .then(data => {
            setLyricState({
              artist: '',
              songname: '',
              lyric: data.lyric,
              infos: data.infos
            });
          })
      }
    }, 500);
  }, []);

  const onChange = (e) => {
    setLyricState({ ...lyricState, [e.target.name]: e.target.value });
  }

  const onSearchLyric = async (e) => {
    e.preventDefault();
    try {
      setLyricState({ ...lyricState, lyric: null });
      let { lyric, infos } = await LyricsService.getLyric(lyricState.artist, lyricState.songname);

      setTimeout(() => {
        setLyricState({ ...lyricState, lyric, infos });
        localStorage.setItem('lyrics-search', JSON.stringify({ ...lyricState, lyric, infos }));
      }, 500);
    } catch (error) {

    }
  }

  useEffect(() => {
    const updateTime = () => {
      let p = 30 - parseInt(audio.currentTime, 10);
      setPreviewTime(p < 10 ? '0' + p : p);
    }

    audio.addEventListener('timeupdate', updateTime);

    return () => audio.removeEventListener('timeupdate', updateTime);
  }, []);

  const onControls = (control) => {
    switch (control) {
      case 'play':
        audio.src = lyricState.infos.preview;
        audio.play();
        break;

      case 'stop':
        audio.pause();
        audio.currentTime = 0;
        break;

      case 'volume':
        audio.volume = audio.volume === 0 ? 1 : 0;
        break;

      default:
        break;
    }
  }

  return (<>
    <div className="lyrics">

      <div className="container">
        <form onSubmit={onSearchLyric} className="w-100 row">
          <div className="col-md-11 p-0">
            <input type="text"
              name="artist"
              onChange={onChange}
              value={lyricState.artist}
              placeholder="Artist: linkin park"
              className="w-50"
              required
            />

            <input type="text"
              name="songname"
              onChange={onChange}
              value={lyricState.songname}
              placeholder="Song: numb"
              className="w-50"
              required
            />
          </div>

          <div className="col-md-1 p-0">
            <button type="submit" className="btn btn-dark btn-block"><i className="fa fa-search"></i></button>
          </div>
        </form>
      </div>
    </div>

    {lyricState.lyric
      ? <div className="container py-3">

        <div className="mb-3">
          <div className="btn btn-dark text-uppercase fs-12 lsp2 mr-0">
            <i className="fas fa-search fs-14"></i> Search results for
        </div>

          <div className="btn btn-warning text-uppercase fs-12 lsp2 m-0">{lyricState.artist} - {lyricState.songname}</div>
        </div>

        {Object.keys(lyricState.infos).length > 0
          && <div className="row">
            <div className="col-md-9"><pre className="bg-dark">{lyricState.lyric}</pre></div>
            <div className="col-md-3">
              <img src={lyricState.infos.image} alt={lyricState.artist} className="w-100 img-thumbnail mb-3" />
              <button className="upper-text text-truncate btn btn-warning w-100">
                {lyricState.artist} - {lyricState.songname}
              </button>

              <div className="mt-3 d-flex justify-content-between">
                <button className="btn btn-dark" onClick={() => { onControls('play'); }}><i className="fa fa-play"></i></button>
                <button className="btn btn-dark" onClick={() => { onControls('stop'); }}><i className="fa fa-stop"></i></button>
                <button className="btn btn-dark" onClick={() => { onControls('volume'); }}><i className="fa fa-volume-up"></i></button>
                <button className="btn btn-dark">{previewTime} <i className="fas fa-hourglass-start fs-12"></i></button>
              </div>

            </div>
          </div>}
      </div>
      : <div className="container py-3">
        <div className="mb-3">
          <div className="btn btn-dark text-uppercase fs-12 lsp2 mr-0">
            <i className="fas fa-search fs-14"></i> Search results for
        </div>

          <div className="btn btn-warning text-uppercase fs-12 lsp2 m-0">Not found</div>
        </div>
        <SkeletonLyrics />
      </div>}

  </>);
}