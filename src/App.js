import React from 'react';

import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Home from './pages/Home';
import User from './pages/User';

import Player from './containers/Player';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import './styles/App.css';
import './styles/Queries.css';
import './styles/Animation.css';
import Search from './pages/Search';
import TrackDetails from './pages/TrackDetails';

export default function App () {

  return (<>
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/search" component={Search} />
        <Route path="/user/:id" component={User} />
        <Route path="/track/:id" component={TrackDetails} />
        <Redirect from="*" to="/" />
      </Switch>

      <Player />
    </Router>

    <Footer />    
  </>);
}
