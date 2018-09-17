import React, { Component } from 'react';

class Product extends Component {
  getDate = () => {
    const msec = Date.parse(this.props.date);
    const date = new Date(msec);
    const days = Math.floor((Date.now() - msec)/(1000 * 3600 * 24));
    let dateInfo = '';
    switch(true) {
      case (days === 0):
        dateInfo = 'Today';
        break;
      case (days === 1):
        dateInfo = '1 day ago';
        break;
      case (days <= 7):
        dateInfo = days + ' days ago';
        break;
      default:
        dateInfo = date.toLocaleDateString();
    }
    return dateInfo;
  };
  render() {
    
    return (
      <div className="itemContainer">
        <p>{this.props.face}</p>
        <p>{this.getDate()}</p>
        <p>{this.props.price}</p>
        <p>{this.props.size}</p>
      </div>
    );
  }
}

export default Product;
