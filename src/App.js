import React from 'react';

import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Home from './pages/Home';
import User from './pages/User';

import Player from './containers/Player';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import './App.css';
import './styles/Queries.css';
import './styles/Animation.css';
import Search from './pages/Search';

export default function App () {

  return (<>
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/search" component={Search} />
        <Route path="/user/:id" component={User} />
        <Redirect from="*" to="/" />
      </Switch>

      <Player />
    </Router>

    <Footer />    
  </>);
}
