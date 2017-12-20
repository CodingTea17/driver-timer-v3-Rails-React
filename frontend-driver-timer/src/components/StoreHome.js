import React, { Component } from 'react';
import Driver from './Driver';

class StoreHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drivers: [],
      store_number: this.props.match.params.id

    };
  }

  componentDidMount() {
    window.fetch(`/api/stores/${this.state.store_number}/drivers`).then(data => {
      data.json().then(res => {
        this.setState({ drivers: res })
      })
    })
  }

  render() {
    return (
      <div>
        <h1>Your Drivers</h1>
          {
            this.state.drivers.map((driver, index) => (
              <Driver
                key={driver.id}
                driver={driver}
                store-number={this.state.store_number}
                count={index + 1}
              />
            ))
          }
      </div>
    );
  }
}

export default StoreHome;
