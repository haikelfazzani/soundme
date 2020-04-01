import React, { useState, useContext } from 'react';
import GlobalContext from '../providers/GlobalContext';
import { withRouter } from 'react-router-dom';

function FormSearch (props) {

  const { state, setState } = useContext(GlobalContext);
  const [query, setQuery] = useState('');

  const onSearch = e => {
    e.preventDefault();
    if (query && query.length > 0) {
      setState({ ...state, searchQuery: query });
      props.history.push("/search?q=" + query);
    }
  }

  return (
    <form className="form-inline my-2 my-lg-0" autoComplete="on" onSubmit={onSearch}>
      <input
        className="form-control w-100" type="text"
        placeholder="Search"
        onChange={(e) => { setQuery(e.target.value) }}
        value={query}
      />
      <button type="submit"> <i className="fas fa-search"></i></button>
    </form>
  );
}

export default withRouter(FormSearch);
