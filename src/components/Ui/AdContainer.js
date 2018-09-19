import React from 'react';

const adContainer = () => (
  <div className="adContainer">
    <p>But first, a word from our sponsors:</p>
    <a href="https://youtu.be/dQw4w9WgXcQ?t=43s" target="_blank" rel="noopener noreferrer" className="ad">
      <img
        src={'http://localhost:3001/ads/?r='+Math.floor(Math.random()*1000)}
        alt="Advertisement"
      />
    </a>
  </div>
);

export default adContainer;
