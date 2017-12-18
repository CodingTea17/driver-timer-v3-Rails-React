import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  getInitialState: function() {
    return {
      stores: []
    }
  },

  componentDidMount: function() {
    var _this = this;
    this.serverRequest =
      axios
        .get("/api/stores")
        .then(function(result) {
          _this.setState({
            stores: result.data.stores
          });
        })
  },

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
        
        </p>
      </div>
    );
  }
}

export default App;
