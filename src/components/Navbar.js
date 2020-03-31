import React, { useState, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import GlobalContext from '../providers/GlobalContext';

function Navbar (props) {

  const { state, setState } = useContext(GlobalContext);
  const [query, setQuery] = useState('');

  const onSearch = e => {
    e.preventDefault();
    setState({ ...state, searchQuery: query });
    props.history.push("/");
  }

  return <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">

      <Link className="navbar-brand" to="/"><i className="fas fa-meteor"></i> Soundme</Link>

      <button className="navbar-toggler" type="button" data-toggle="collapse">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">

        <ul className="navbar-nav mr-auto"></ul>

        <form className="form-inline my-2 my-lg-0" onSubmit={onSearch}>
          <input
            className="form-control" type="text"
            placeholder="Search"
            onChange={(e) => { setQuery(e.target.value) }}
            value={query}
          />
          <button type="submit"> <i className="fas fa-search"></i></button>
        </form>

      </div>
    </div>
  </nav>;
}

export default withRouter(Navbar)
