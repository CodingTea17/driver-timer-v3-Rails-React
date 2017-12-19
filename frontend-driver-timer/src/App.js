import React, { Component } from 'react';
import ActionCable from 'actioncable'
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
    window.fetch('/api/stores').then(data => {
      data.json().then(res => {
        this.setState({ stores: res })
      })
    })

    const cable = ActionCable.createConsumer('ws://localhost:3001/cable')
    this.sub = cable.subscriptions.create('StoresChannel', {
      received: this.handleReceiveNewStores
    })
  }

  handleReceiveNewStores = ({ new_store }) => {
    let updated_stores = this.state.stores.concat(new_store);
    console.log({updated_stores});
    this.setState({ stores: updated_stores })
  }

  render_store_nums = ( )=> {
    let stores = this.state.stores;
    let store_elements = stores.map((store) => {
      return (
        <p key={store.id}>
          {store.store_number}
        </p>
      )
    })
    return store_elements;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {this.render_store_nums}
      </div>
    );
  }
}

export default App;
