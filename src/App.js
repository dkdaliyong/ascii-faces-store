import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    page: 0,
    products: [],
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
          this.setState({ loading: false });
          this.setState({ products: [...result] });
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
    return (
      <div className="appContainer">
        <button onClick={() => {
          this.setState(prevState => {
            return {page: prevState.page + 1}
          });
        }}>Button</button>
        {this.state.loading && <p>Loading...</p>}
        {this.state.limitReached && <p>End Reached...</p>}
        {this.state.apiError && <p>Error: Please check your network connection and try again later.</p>}
      </div>
    );
  }
}

export default App;
