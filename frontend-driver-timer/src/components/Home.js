import React, { Component } from 'react';
import ActionCable from 'actioncable'
import Store from './Store.js';

class Home extends Component {
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
        // res.forEach((store) => {
          // window.fetch(`/api/stores/${store.id}/drivers`).then(data => {
          //   data.json().then(res => {
          //     this.setState({ drivers: res })
          //     res.forEach((driver) => {
          //       console.log(driver.name)
          //     })
          //   })
          // })
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <ul>
          {
            this.state.stores.map((store, index) => (
              <Store
                key={store.id}
                store={store}
                count={index + 1}
              />
            ))
          }
        </ul>
      </div>
    );
  }
}

export default Home;
