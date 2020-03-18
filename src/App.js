import React from 'react';
import Footer from './components/Footer';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import Home from './pages/Home';

import './App.css';

export default function App () {

  return (<Router>

    <Route exact path="/" component={Home} />
    <Redirect path="*" to="/" />

    <Footer />
  </Router>);
}
