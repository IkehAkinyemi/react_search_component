import React from 'react';
import './Suggestion.css';

function Suggestion({ correctionSugs, searchValue, selectSug }) {
  return (
    <>
    {
      searchValue && correctionSugs.length > 1 &&
      <div className="suggestion">
          <h4 className="suggestion__header">Did you mean?</h4>
          {
            correctionSugs.map(item => {
              return <p className="suggestion__sug" key={item} onClick={() => selectSug(item)}>{item}</p>
            })
          }
      </div>
    }
    </>
  )
}

export default Suggestion;