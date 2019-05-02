import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const App = () => {

  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('technology');
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const searchInputRef = useRef();

  useEffect(() => {
        getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`)
      setResults(response.data.hits);
    } catch (err) {
      setError(err)
    }
    setLoading(false);
  };

  const handleSearch = event => {
    event.preventDefault();
    getData();  
  };

  const handleClearSearch = () => {
    setQuery("");
    searchInputRef.current.focus();
  }

  return (
    <>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={query}
          ref={searchInputRef}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={handleClearSearch}>Clear</button>
      </form>
      { loading ? <div>Loading...</div> : <ul>
        {results.map(result => (
          <li key={result.objectID}>
            <a href={result.url}>{result.title}</a>
          </li>
        ))}
      </ul>}

      { error && (
        <div>{error.message}</div>
      )}
    </>
  );
};

export default App;