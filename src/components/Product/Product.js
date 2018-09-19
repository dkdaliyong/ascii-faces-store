import React, { Component } from 'react';

export default class Product extends Component {
  getDate = () => {
    const msec = Date.parse(this.props.product.date); // parse date in milliseconds
    const date = new Date(msec); // date to use in case product is older than 1 week
    const days = Math.floor((Date.now() - msec)/(1000 * 3600 * 24)); // days since product was posted
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
        dateInfo = date.toLocaleDateString(); // more than 1 week displays full date
    }
    return dateInfo;
  };

  render() {
    return (
      <div className="itemContainer">
        <div className="faceContainer">
          <p style={{ fontSize: this.props.product.size+'px' }}>{this.props.product.face}</p>
        </div>
        <p className="productInfo"><b>Price:</b> ${(this.props.product.price/100).toFixed(2)}</p>
        <p className="productInfo"><b>Size:</b> {this.props.product.size}</p>
        <p className="productInfo"><b>Id:</b> {this.props.product.id}</p>
        <p className="productInfo date">Posted: {this.getDate()}</p>
      </div>
    );
  }
}
