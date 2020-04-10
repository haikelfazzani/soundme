import React, { useState, useEffect } from 'react';
import LyricsService from '../services/LyricsSercice';

import '../styles/Lyrics.css';
import SkeletonLyrics from '../components/SkeletonLyrics';

export default function Lyrics () {

  const [lyricState, setLyricState] = useState({ artist: '', songname: '', lyric: null });

  useEffect(() => {
    let local = localStorage.getItem('lyrics-search');

    if (local) {
      let v = JSON.parse(local);
      setLyricState({ artist: v.artist, songname: v.songname, lyric: v.lyric });
    }
    else {
      LyricsService.getLyric('linkin park', 'numb')
        .then(lyric => {
          setLyricState({ artist: 'linkin park', songname: 'numb', lyric });
        })
    }
  }, []);

  const onChange = (e) => {
    setLyricState({ ...lyricState, [e.target.name]: e.target.value });
  }

  const onSearchLyric = async (e) => {
    e.preventDefault();
    setLyricState({ ...lyricState, lyric: null });
    let lyric = await LyricsService.getLyric(lyricState.artist, lyricState.songname);
    setLyricState({ ...lyricState, lyric });
    localStorage.setItem('lyrics-search', JSON.stringify({ ...lyricState, lyric }));
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

          <button type="submit" className="col-md-1 p-0 w-100 btn btn-dark"><i className="fa fa-search"></i></button>
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

        <pre className="bg-dark">{lyricState.lyric}</pre>
      </div>
      : <div className="container py-5"><SkeletonLyrics /></div>}

  </>);
}