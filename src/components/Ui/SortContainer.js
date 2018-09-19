import React from 'react';

const sortContainer = props => (
  <div className="sortContainer">
    <p style={{ flex: '0 0 25%' }}>Sort By:</p>
    <button style={{ flex: '0 0 25%' }} onClick={() => props.changeSortBy('price')}>Price</button>
    <button style={{ flex: '0 0 25%' }} onClick={() => props.changeSortBy('size')}>Size</button>
    <button style={{ flex: '0 0 25%' }} onClick={() => props.changeSortBy('id')}>Id</button>
  </div>
);

export default sortContainer;
