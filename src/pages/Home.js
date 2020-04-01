import React, { useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import ScService from '../services/ScService';
import GlobalContext from '../providers/GlobalContext';

import '../styles/ListGenres.css';
import ListTracks from '../containers/ListTracks';

const genres = ['Rock', 'Metal', 'Blues', 'Jazz', 'HipHop', 'Pop', 'Reggae',
  'Dubstep', 'EDM', 'Electronic', 'House', 'Trance', 'Piano'
];

export default function Home () {

  const { state, setState } = useContext(GlobalContext);
  const [tracks, setTracks] = useState([]);
  const [activeGenre, setActiveGenre] = useState(state.activeGenre);

  useEffect(() => {
    ScService.getTracks(activeGenre)
      .then((result) => { setTracks(result); })
      .catch(e => { });
  }, []);

  const onGenreSelect = (genre) => {
    ScService.getTracks(genre.toLowerCase())
      .then((result) => {
        if (result.length > 0) {
          setTracks([]);
          setTimeout(() => {
            setTracks(result);
            setActiveGenre(genre);
            setState({ ...state, activeGenre: genre });
          }, 500);
        }
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

    <ListTracks tracks={tracks} />
  </>);
}
