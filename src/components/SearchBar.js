import React from 'react';
import './SearchBar.css';
import SearchIcon from './SearchIcon';

function SearchBar({ handleSearch, nextWord, searchValue, selectSug }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') selectSug(false, nextWord);
  }

  return (
    <>
    { searchValue && <p className="tip">Hit the <span>Tab</span> key to accept suggestion</p> }
    <div className="search-bar" tabIndex="0">
        <input 
          className="search-bar__input" 
          type="text" 
          name="search" 
          placeholder="Enter search keyword..." 
          onChange={handleSearch}
          value={searchValue}
          spellCheck={true}
          onKeyDown={handleKeyDown}
        />
        { searchValue && nextWord && <span className="search-bar__suggestion"><i>{nextWord}</i></span> }
        <span className="search-bar__icon" onClick={() => alert(searchValue)}>
          <SearchIcon />
        </span>
    </div>
    </>
  )
}

export default SearchBar;