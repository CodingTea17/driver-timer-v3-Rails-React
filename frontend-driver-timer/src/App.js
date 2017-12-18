import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      stores: [],
    };
  }

  componentDidMount() {
    fetch(`/api/stores`)
    .then(results => {
      return results.json()
    }).then(data => {
      console.log(data)
      let stores = data.map((store) => {
        return(
          <p key={store.id}>
            {store.store_number}
          </p>
        )
      })
      this.setState({stores: stores});
      console.log("state", this.state.stores)
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {this.state.stores}
      </div>
    );
  }
}

export default App;
