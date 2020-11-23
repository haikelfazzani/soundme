import React, { Suspense, useEffect, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { withRouter } from 'react-router-dom';
import Spinner from '../components/Spinner';
import debounce from '../util/debounce';
import '../styles/ListGenres.css';

const ListGenres = React.lazy(() => import('../containers/ListGenres'));
const ListTracks = React.lazy(() => import('../containers/ListTracks'));

function Home () {

  const activeGenre = useStoreState(state => state.activeGenre);
  const getTracksByGenre = useStoreActions(actions => actions.getTracksByGenre);

  const [tracks, setTracks] = useState([]);
  const [limit, setLimit] = useState(48);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTracksByGenre({ activeGenre })
      .then(result => {
        if (result && result.length > 0) {
          setTracks([]);
          setTracks(result);
          localStorage.setItem('sc-tracks', JSON.stringify(result));
        }
      })
      .catch(e => {
        let t = JSON.parse(localStorage.getItem('sc-tracks'));
        setTracks(t);
      });
  }, [activeGenre]);

  const onLoadMore = debounce(() => {
    setIsLoading(true);
    getTracksByGenre({ activeGenre, limit: limit + 48 })
      .then(result => {
        if (result && result.length > 0) {
          setTracks(result);
          setLimit(limit + 48);
          localStorage.setItem('sc-tracks', JSON.stringify(result));
          setIsLoading(false);
        }
      })
      .catch(e => {
        let t = JSON.parse(localStorage.getItem('sc-tracks'));
        setTracks(t);
        setIsLoading(false);
      });
  });


  return (<>
    <Suspense fallback="loading..">
      <ListGenres />
      <ListTracks tracks={tracks} />
    </Suspense>
    <div className="w-100 d-flex justify-content-center">
      <button className="btn btn-dark w-25 fs-10 lsp2" onClick={onLoadMore}>LOAD MORE</button>
    </div>
    {isLoading && <Spinner />}
  </>);
}

export default withRouter(Home);
