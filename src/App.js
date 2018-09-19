import React, { Component } from 'react';
import Product from './components/Product/Product';
import HeaderTop from './components/Ui/Header';
import AdContainer from './components/Ui/AdContainer';
import SortContainer from './components/Ui/SortContainer';
import Loader from './components/Ui/Loader/Loader';
import './App.css';

export default class App extends Component {
  state = {
    page: 1,
    products: [],
    productsPrefetch: [],
    productsArePrefetched: true,
    sortBy: 'price',
    advertisementId: null,
    loading: false,
    apiError: false,
    limitReached: false,
    bottomReached: false,
  };

  componentDidMount() {
    this.loadProducts(this.state.sortBy);
  };

  componentDidUpdate(_, prevState) {
    if (this.state.sortBy !== prevState.sortBy) {
      this.loadProducts(this.state.sortBy);
    };
  };

  loadAdvertisement = () => {
    const newId = Math.floor(Math.random() * 1000);
    if (this.state.advertisementId !== newId) {
      this.setState({ advertisementId: newId });
    } else {
      this.loadAdvertisement();
    };
  };

  loadProducts = async (sortBy) => {
    this.loadAdvertisement();
    this.setState({ loading: true, products: [] });
    const endpoint = 'http://localhost:3001/api/products?_page=1&_limit=20&_sort='+sortBy;
    try {
      const res = await fetch(endpoint);
      const products = await res.json();
      this.setState({
        loading: false,
        products: [...products],
        page: 2,
        sortBy,
      }, () => {
        this.prefetchSomeProducts();
      });
      
    } catch (e) {
      this.setState({ loading: false, apiError: true });
      console.log('API Error: ', e);
    }
  };

  loadMoreProducts = () => {
    this.loadAdvertisement();
    if (!this.state.limitReached) {
      this.setState({
        products: [...this.state.products, ...this.state.productsPrefetch],
        loading: false,
        bottomReached: false,
      }, () => {
        this.prefetchSomeProducts();
      });
    } else {
      this.setState({ loading: false, bottomReached: false, });
    }
  };

  prefetchSomeProducts = async () => {
    this.setState({ productsArePrefetched: false });
    const endpoint = 'http://localhost:3001/api/products?_page='+this.state.page+'&_limit=20&_sort='+this.state.sortBy;
    try {
      const res = await fetch(endpoint);
      const productsPrefetch = await res.json();
      if (productsPrefetch.length > 0) {
        this.setState(prevState => {
          return {
            productsArePrefetched: true,
            productsPrefetch: [...productsPrefetch],
            page: prevState.page + 1,
          }
        }, () => {
          if (this.state.bottomReached && this.state.productsArePrefetched) {
            this.loadMoreProducts();
            // loadMoreProducts() is called if products are prefetched and the bottom is reached. Whichever condition was met last calls the loadMoreProducts().
          }
        });
      } else {
        this.setState({ productsArePrefetched: true, limitReached: true });
      }
    } catch (e) {
      this.setState({ loading: false, apiError: true });
      console.log('API Error: ', e);
    }
  };

  changeSortByHandler = sortBy => {
    this.setState({ sortBy });
    // Products are reloaded in componentDidUpdate awaiting this sortBy state change
  };

  // This is the handler for when a user has reached the bottom of the products grid and load more items.
  // Admittedly, I got this from stackoverflow, but the idea is simple. By subtracting scrollTop (how much the user has scrolled down from the top) from scrollHeight (the element's whole height, including the hidden content), we'll get an idea of where the user is now currently scrolling on the list. If it reaches down to the container's height (600px in this case), we'll know the user has reached the bottom. We can have a trigger at that point, but it can also detect if a user is 100px or 200px from the bottom etc.
  onScroll = e => {
    const bottom = e.target.scrollHeight - e.target.scrollTop <= 600;
    
    if (bottom && !this.state.loading) {
      this.setState({ loading: true, bottomReached: true }, () => {
        if (this.state.bottomReached && this.state.productsArePrefetched) {
          this.loadMoreProducts();
          // loadMoreProducts() is called if products are prefetched and the bottom is reached. Whichever condition was met last calls the loadMoreProducts().
        }
      });
    }
  }

  render() {
    const { products, loading, limitReached, apiError, advertisementId } = this.state;
    return (
      <div className="appContainer">
        <HeaderTop />
        <AdContainer advertisementId={advertisementId} />
        <SortContainer changeSortBy={this.changeSortByHandler} />
        <div className="productsContainer" onScroll={this.onScroll}>
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
          {loading && <Loader />}
          {limitReached && <p className="endReachedMessage">~ end of catalogue ~</p>}
          {apiError && <p>Error: Please check your network connection and try again later.</p>}
        </div>
      </div>
    );
  }
}
