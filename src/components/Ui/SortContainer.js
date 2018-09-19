import React from 'react';

const sortContainer = props => (
  <div className="sortContainer">
    <p style={{ flex: '0 0 25%' }}>SORT BY:</p>
    <p style={{ flex: '0 0 25%' }} onClick={() => props.changeSortBy('price')}>Price</p>
    <p style={{ flex: '0 0 25%' }} onClick={() => props.changeSortBy('size')}>Size</p>
    <p style={{ flex: '0 0 25%' }} onClick={() => props.changeSortBy('id')}>Id</p>
  </div>
);

export default sortContainer;
