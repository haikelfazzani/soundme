import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormSearch from '../containers/FormSearch';

export default function Navbar () {

  const [showMenu, setShowMenu] = useState(false);

  const onDropMenu = () => { setShowMenu(!showMenu); }

  return <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        <Link className="navbar-brand" to="/">
          <i className="fas fa-meteor"></i> Soundme
        </Link>

        <button className="navbar-toggler" type="button" data-toggle="collapse" onClick={onDropMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" style={{ display: showMenu ? 'block' : 'none' }}>

          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/"><i className="fas fa-home"></i> Home</Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/find-lyric"><i className="fas fa-circle"></i> Find Lyric</Link>
            </li>
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item"><FormSearch /></li>
          </ul>

        </div>
      </div>


    </nav>
  </>;
}
