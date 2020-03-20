import React, { useEffect, useState, useContext } from 'react';
import TrackService from '../services/TrackService';

import Card from '../components/Card';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import Player from '../components/Player';

import searchImg from '../img/search.svg'
import GlobalContext from '../providers/GlobalContext';

const genres = ['Rock', 'Metal', 'Blues', 'Jazz', 'HipHop', 'Pop', 'Reggae',
  'Dubstep', 'EDM', 'Electronic', 'Deep', 'House', 'Trance', 'Piano'
];

export default function Home () {

  const { state, setState } = useContext(GlobalContext);
  const [tracks, setTracks] = useState([]);
  const [query, setQuery] = useState(null);
  const [activeGenre, setActiveGenre] = useState(state.activeGenre);

  useEffect(() => {
    TrackService.getTracks(activeGenre)
      .then((result) => { setTracks(result); })
      .catch(e => { });
  }, []);

  const getSearchQuery = value => {
    setQuery(value);
    TrackService.searchQuery(value)
      .then((result) => {
        if (result && result.length > 0) { setTracks(result); }
      })
      .catch(e => { });
  }

  const onGenreSelect = (genre) => {
    TrackService.getTracks(genre.toLowerCase())
      .then((result) => {
        setTracks(result);
        setActiveGenre(genre);
        setState({ ...state, activeGenre: genre });
      })
      .catch(e => { });
  }

  return (<>
    <Navbar sender={getSearchQuery} />

    <ul className="list-genres overflow-auto">
      {genres.map(g => <li className={"list-group-item cp fs-14 " + (activeGenre === g ? "active" : "")}
        key={g} onClick={() => { onGenreSelect(g) }}>{g}</li>)}
    </ul>

    <div className="container py-5">

      {query && <h4>
        <i className="fas fa-search mb-3"></i> Search results: {tracks && tracks.length > 0 ? query : 'not found..'}
      </h4>}

      <div className="row">
        {tracks && tracks.length > 0
          ? tracks.map((track, i) => <div className="col-md-3 mb-3" key={track.id}>
            {state.currentTrackPlay.id === track.id ? <Card track={track} /> : <Card track={track} active={true} />}
          </div>)
          : <>
            <img src={searchImg} alt=".." className="img-fluid w-50 mx-auto py-5" />
            <Spinner />
          </>}
      </div>
    </div>

    <Player />
  </>);
}
