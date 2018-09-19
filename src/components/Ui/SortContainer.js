import React from 'react';

const sortContainer = props => (
  <div className="sortContainer">
    <p className="sortContp1">SORT BY:</p>
    <p
      className={"sortButton " + (props.active === 'price' && 'sortActive')}
      onClick={() => props.changeSortBy('price')}>PRICE
    </p>
    <p
      className={"sortButton " + (props.active === 'size' && 'sortActive')}
      onClick={() => props.changeSortBy('size')}>SIZE
    </p>
    <p
      className={"sortButton " + (props.active === 'id' && 'sortActive')}
      onClick={() => props.changeSortBy('id')}>ID
    </p>
  </div>
);

export default sortContainer;
