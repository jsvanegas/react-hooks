import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function FetchExample() {

  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('react hooks');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchInputRef = useRef();

  useEffect(() => {
    getResults();
  }, []);

  const getResults = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`);
      setResults(response.data.hits);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    getResults();
  };

  const handleClearSearch = (event) => {
    setQuery('');
    searchInputRef.current.focus();
  };

  return (
    <form onSubmit={handleSearch}>
      <input type="text" onChange={event => setQuery(event.target.value)} value={query} ref={searchInputRef} />
      <button type="submit">Search</button>
      <button type="button" onClick={handleClearSearch}>Clear</button>
      {
        loading
          ? (<div>Loading Results...</div>)
          : (
            <ul>
              {results.map(result => (
                <li key={result.objectID}>
                  <a href={result.url} target="_blank" rel="noopener noreferrer">{result.title}</a>
                </li>
              ))}
            </ul>
          )
      }
      {error && <div>{error.message}</div>}
    </form>
  );
}