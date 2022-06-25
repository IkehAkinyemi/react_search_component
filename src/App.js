import React, { useCallback } from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Suggestion from './components/Suggestion';

function App() {
  const [nextWordSug, setNextWordSug] = useState('');
  const [correctionSugs, setCorrectionSugs] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [canSearch, setCanSearch] = useState(false);


  // Fetch Suggestions
  const getSuggestions = useCallback( async () => {
    let word = searchValue.trim().split(' ');
    word = word[word.length - 1];
    try {
      const res = await fetch(`https://api.datamuse.com/words?lc=${word}`);
      const data = await res.json();
      if (data.length > 1) setNextWordSug(data[0].word);
    } catch (err) {
      alert('Error occured while getting susggestions!');
    }

    try {
      const res = await fetch(`https://api.datamuse.com/words?sp=${word}`);
      const data = await res.json();
      let _data = [];
      for (let i = 0; i < 3; i++) {
        if (data.length >= 3) {
          if (data[0].word !== word.toLowerCase()) _data.push(data[i].word);
        }
        setCorrectionSugs(_data);
      }
    } catch (err) {
      alert('Error occured while getting susggestions!');
      console.log(err);
    }
  }, [searchValue]);
  
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value.length >= 3 && e.target.value.endsWith(' ')) setCanSearch(true);
    else setCanSearch(false);
  }

  const selectSug = (correction, suggestion) => {
    if(correction) {
      let newSearchValue = searchValue.trim().split(' ');
      newSearchValue.pop();
      setSearchValue(newSearchValue + " " + correction);
    } else {
      setSearchValue(searchValue + " " + suggestion);
    }
  }

  useEffect(() => {
    if(canSearch) {
      getSuggestions();
    }
  }, [canSearch, getSuggestions]);

  return (
    <div className="App">
      <h1 className="App__header">Typo Friendly Search Demo </h1>
      <SearchBar 
        handleSearch={handleSearch} 
        nextWord={nextWordSug} 
        searchValue={searchValue}
        selectSug={selectSug}
      />
      <Suggestion correctionSugs={correctionSugs} searchValue={searchValue} selectSug={selectSug}/>
    </div>
  );
}

export default App;
