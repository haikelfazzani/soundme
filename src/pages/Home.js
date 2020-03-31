import React, { useEffect, useState, useContext } from 'react';
import ScService from '../services/ScService';
import GlobalContext from '../providers/GlobalContext';
import Card from '../components/Card';
import Spinner from '../components/Spinner';

import searchImg from '../img/search.svg'

import '../styles/ListGenres.css';
import { withRouter } from 'react-router-dom';

const genres = ['Rock', 'Metal', 'Blues', 'Jazz', 'HipHop', 'Pop', 'Reggae',
  'Dubstep', 'EDM', 'Electronic', 'House', 'Trance', 'Piano'
];

function Home () {

  const { state, setState } = useContext(GlobalContext);
  const [tracks, setTracks] = useState([]);
  const [activeGenre, setActiveGenre] = useState(state.activeGenre);

  useEffect(() => {
    ScService.getTracks(activeGenre)
      .then((result) => { setTracks(result); })
      .catch(e => { });
  }, []);

  useEffect(() => {
    ScService.searchQuery(state.searchQuery)
      .then((result) => {
        if (result && result.length > 0) { setTracks(result); }
      })
      .catch(e => { });
  }, [state.searchQuery]);

  const onGenreSelect = (genre) => {
    ScService.getTracks(genre.toLowerCase())
      .then((result) => {
        setTracks(result);
        setActiveGenre(genre);
        setState({ ...state, activeGenre: genre });
      })
      .catch(e => { });
  }

  return (<>
    
    <div className="list-genres">
      <div className="container">
        <ul className="overflow-auto">
          {genres.map(g => <li className={"list-group-item cp fs-12 text-uppercase " + (activeGenre === g ? "active" : "")}
            key={g} onClick={() => { onGenreSelect(g) }}>{g}</li>)}
        </ul>
      </div>
    </div>

    <div className="container py-4 min-vh-100">
      <div className="row">
        {tracks && tracks.length > 0
          ? tracks.map((track, i) => <div className="col-md-3 mb-3" key={track.id}>
            {state.currentTrackPlay.id === track.id
              ? <Card track={track} />
              : <Card track={track} active={true} />}
          </div>)
          : <>
            <img src={searchImg} alt=".." className="img-fluid w-50 mx-auto py-5" />
            <Spinner />
          </>}
      </div>
    </div>
  </>);
}

export default withRouter(Home);