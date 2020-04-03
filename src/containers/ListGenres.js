import React, { useContext, useState } from 'react';
import GlobalContext from '../providers/GlobalContext';
import { withRouter } from 'react-router-dom';

const genres = ['Rock', 'Metal', 'Blues', 'Jazz', 'HipHop', 'Pop', 'Reggae',
  'Dubstep', 'EDM', 'Electronic', 'House', 'Trance', 'Piano'
];

function ListGenres (props) {

  const { state, setState } = useContext(GlobalContext);
  const [activeGenre, setActiveGenre] = useState(state.activeGenre);

  const onGenreSelect = (genre) => {
    setActiveGenre(genre);
    setState({ ...state, activeGenre: genre });
    
    if (props.location.pathname !== '/') {
      props.history.push('/');
    }
  }

  return (
    <div className="list-genres">
      <div className="container">
        <ul className="overflow-auto">
          {genres.map(g => <li className={"list-group-item cp fs-12 text-uppercase " + (activeGenre === g ? "active" : "")}
            key={g} onClick={() => { onGenreSelect(g) }}>{g}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default withRouter(ListGenres);