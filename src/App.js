import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    const apiEnd = "http://localhost:3001/api/products";
    fetch(apiEnd)
      .then(resp => resp.json())
      .then(
        (result) => {
          console.log('Success: ', result);
          // this.setState({
          //   isLoaded: true,
          //   items: result.items
          // });
        },
        (error) => {
          console.log('Error: ', error);
          // this.setState({
          //   isLoaded: true,
          //   error
          // });
        }
      )
  };

  render() {
    return (
      <div />
    );
  }
}

export default App;
