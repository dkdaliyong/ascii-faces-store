import React, { Component } from 'react';
import Product from './components/Product/Product';
import './App.css';

// TODO: disable fetch if limit is reached

class App extends Component {
  state = {
    page: 0,
    products: [],
    titleFace: '',
    loading: false,
    apiError: false,
    limitReached: false,
  };

  componentDidMount() {
    this.setState({ loading: true });

    fetch('http://localhost:3001/api/products?_page=0&_limit=30')
      .then(resp => resp.json())
      .then(
        (result) => {
          this.setState({
            loading: false,
            products: [...result],
            titleFace: result[Math.floor(Math.random() * 30)].face
          });
        },
        () => {
          this.setState({ loading: false, apiError: true });
        }
      )
  };

  componentDidUpdate(_, prevState) {
    if (this.state.page !== prevState.page) {
      this.setState({ loading: true });

      const apiEnd = 'http://localhost:3001/api/products?_page='+this.state.page+'&_limit=30';

      fetch(apiEnd)
        .then(resp => resp.json())
        .then(
          (result) => {
            this.setState({ loading: false });
            if (result.length > 0) {
              this.setState({ products: [...this.state.products, ...result] });
            } else {
              this.setState({ limitReached: true });
            }
          },
          () => {
            this.setState({ loading: false, apiError: true });
          }
        )
    }
  };

  render() {
    const { products, loading, limitReached, apiError } = this.state;
    return (
      <div className="appContainer">
        <p className="title">THE ASCII STORE {this.state.titleFace}</p>
        <hr />
        <p className="welcomeMsg">Welcome! Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.</p>
        <div className="adContainer">
          <p>But first, a word from our sponsors:</p>
          <a href="https://youtu.be/dQw4w9WgXcQ?t=43s" target="_blank" rel="noreferrer" className="ad">
            <img
              src={'http://localhost:3001/ads/?r='+Math.floor(Math.random()*1000)}
              alt="Advertisement"
            />
          </a>
        </div>
        <div className="productsContainer">
          {products.map(product => {
            return (
              <Product
                key={product.id}
                date={product.date}
                face={product.face}
                price={product.price}
                size={product.size}
              />
            );
          })}
        </div>
        <button
          onClick={() => {
            this.setState(prevState => {
              return {page: prevState.page + 1}
            });
          }}
          style={{ display: 'block' }}
        >Button</button>
        {loading && <p>Loading...</p>}
        {limitReached && <p>End Reached...</p>}
        {apiError && <p>Error: Please check your network connection and try again later.</p>}
      </div>
    );
  }
}

export default App;
