import React, { useState } from 'react';

export default function Navbar ({ sender }) {

  const [query, setQuery] = useState(null);

  const onSearch = e => {
    e.preventDefault();
    sender(query);
  }

  return <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
      <a className="navbar-brand" href="#">Soundme</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">

        <ul className="navbar-nav mr-auto"></ul>

        <form className="form-inline my-2 my-lg-0" onSubmit={onSearch}>
          <input className="form-control mr-sm-2" type="search"
            placeholder="Search" aria-label="Search"
            onChange={(e) => { setQuery(e.target.value) }} value={query} />
          <button className="btn btn-outline-dark my-2 my-sm-0" type="submit">
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>
    </div>
  </nav>;
}