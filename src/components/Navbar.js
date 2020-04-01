import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormSearch from '../containers/FormSearch';

export default function Navbar () {

  const [showMenu, setShowMenu] = useState(false);

  const onDropMenu = () => { setShowMenu(!showMenu); }

  return <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">

      <Link className="navbar-brand" to="/"><i className="fas fa-meteor"></i> Soundme</Link>

      <button className="navbar-toggler" type="button" data-toggle="collapse" onClick={onDropMenu}>
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent"
        style={{ display: showMenu ? 'block' : 'none' }}>

        <ul className="navbar-nav mr-auto"></ul>

        <FormSearch />

      </div>
    </div>
  </nav>;
}
