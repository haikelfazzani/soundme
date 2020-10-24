import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { withRouter } from 'react-router-dom';

const genres = ['rock', 'metal', 'indie', 'jazz', 'hipHop', 'pop', 'reggae',
  'dubstep', 'edm', 'electronic', 'house', 'trance', 'piano'
];

const topGenres = ['rock', 'metal', 'jazzblues', 'hiphoprap', 'pop', 'reggae', 'dubstep',
  'edm', 'electronic', 'house', 'trance', 'piano'];

function ListGenres (props) {

  const activeGenre = useStoreState(state => state.activeGenre);
  const setGenre = useStoreActions(actions => actions.setGenre);

  const onGenreSelect = (genre) => {
    if (props.location.pathname !== '/' && props.location.pathname !== '/top-tracks') {
      props.history.push('/');
    }
    else {
      if (props.location.pathname.includes('/top-tracks')) {
        genre = topGenres.find(t => t.includes(genre.toLowerCase())) || genre;
      }
      setGenre(genre);
    }
  }

  return <div className="list-genres sticky-top">
    <div className="container">
      <ul className="overflow-auto">

        {genres.map(g => <li
          className={"list-group-item cp fs-12 text-uppercase " + (activeGenre.includes(g) ? "active" : "")}
          key={g}
          onClick={() => { onGenreSelect(g) }}>
          {g}
        </li>)}

      </ul>
    </div>
  </div>;
}

export default withRouter(ListGenres);