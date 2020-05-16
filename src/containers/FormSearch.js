import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';

// form search: navbar -> search for track by title
function FormSearch (props) {

  const [query, setQuery] = useState('');
  const setSearchQuery = useStoreActions(actions => actions.setSearchQuery);

  const onSearch = e => {
    e.preventDefault();
    if (query && query.length > 0) {
      setSearchQuery(query);
      props.history.push("/search?q=" + query);
    }
  }

  return (
    <form className="d-flex justify-content-center align-items-center top-form-search" onSubmit={onSearch}>
      <input
        className="form-control w-100" type="text"
        placeholder="Search"
        onChange={(e) => { setQuery(e.target.value) }}
        value={query}
        required
      />
      <button type="submit" className="btn btn-dark"><i className="fas fa-search"></i></button>
    </form>
  );
}

export default withRouter(FormSearch);
