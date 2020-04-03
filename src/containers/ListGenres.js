import React from 'react';
import { useStoreState,useStoreActions  } from 'easy-peasy';
import { withRouter } from 'react-router-dom';
import InlineList from '../components/InlineList';

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

  return <InlineList data={genres} onItemClick={onGenreSelect} active={activeGenre} />;
}

export default withRouter(ListGenres);