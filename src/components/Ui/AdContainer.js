import React from 'react';

const adContainer = props => (
  <div className="adContainer">
    <p>But first, a word from our sponsors:</p>
    <a href="https://youtu.be/dQw4w9WgXcQ?t=43s" target="_blank" rel="noopener noreferrer" className="ad">
      <img
        src={props.advertisementId ? 'http://localhost:3001/ads/?r='+props.advertisementId : null}
        alt="Advertisement"
      />
    </a>
  </div>
);

export default adContainer;
