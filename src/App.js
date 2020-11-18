import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import Home from './pages/Home';
import Search from './pages/Search';
import Player from './containers/player/Player';
//import TopTracks from './pages/TopTracks';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Spinner from './components/Spinner';

import './styles/App.css';
import './styles/Queries.css';
import './styles/Animation.css';

const Lyrics = lazy(() => import('./pages/Lyrics'));
const Track = lazy(() => import('./pages/track/Track'));
const User = lazy(() => import('./pages/user/User'));

export default function App () {

  return (<>
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route path="/top-tracks" component={TopTracks} /> */}
        <Route path="/search" component={Search} />
        <Route path="/find-lyric" component={() => <Suspense fallback={<Spinner />}><Lyrics /></Suspense>} />

        <Route path="/user/:id" component={() => <Suspense fallback={<Spinner />}><User /></Suspense>} />
        <Route path="/track/:userId/:id" component={() => <Suspense fallback={<Spinner />}><Track /></Suspense>} />

        <Redirect from="*" to="/" />
      </Switch>

      <Player />

    </Router>    

    <Footer />
  </>);
}
