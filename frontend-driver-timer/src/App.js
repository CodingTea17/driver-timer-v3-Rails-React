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
        let stores = res.map((store) => {
          return (
            <p key={store.id}>
              {store.store_number}
            </p>
          )
        })
        this.setState({ stores })
      })
    })

    const cable = ActionCable.createConsumer('ws://localhost:3001/cable')
    this.sub = cable.subscriptions.create('StoresChannel', {
      received: this.handleReceiveNewStores
    })
  }

 handleReceiveNewStores = ({ stores }) => {
  console.log({stores});
  let new_stores = stores.map((store) => {
    return (
      <p key={store.id}>
        {store.store_number}
      </p>
    )
  })
  this.setState({ stores: new_stores })
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
