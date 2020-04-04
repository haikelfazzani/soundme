import React from 'react';

import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Home from './pages/Home';
import User from './pages/user/User';
import Search from './pages/Search';
import Track from './pages/track/Track';

import Player from './containers/player/Player';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import './styles/App.css';
import './styles/Queries.css';
import './styles/Animation.css';

export default function App () {

  return (<>
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/search" component={Search} />
        
        <Route path="/user/:id" component={User} />
        <Route path="/track/:userId/:id" component={Track} />
        
        <Redirect from="*" to="/" />
      </Switch>

      <Player />
    </Router>

    <Footer />    
  </>);
}
