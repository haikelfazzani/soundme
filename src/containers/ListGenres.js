import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { withRouter } from 'react-router-dom';

const genres = ['Rock', 'Metal', 'Blues', 'Jazz', 'HipHop', 'Pop', 'Reggae',
  'Dubstep', 'EDM', 'Electronic', 'House', 'Trance', 'Piano'
];

function ListGenres (props) {

  const activeGenre = useStoreState(state => state.activeGenre);
  const setGenre = useStoreActions(actions => actions.setGenre);

  const onGenreSelect = (genre) => {
    setGenre(genre);
    if (props.location.pathname !== '/') {
      props.history.push('/');
    }
  }

  return <div className="list-genres sticky-top">
    <div className="container">
      <ul className="overflow-auto">

        {genres.map(g => <li
          className={"list-group-item cp fs-12 text-uppercase " + (activeGenre === g ? "active" : "")}
          key={g}
          onClick={() => { onGenreSelect(g) }}>
          {g}
        </li>)}

      </ul>
    </div>
  </div>;
}

export default withRouter(ListGenres);