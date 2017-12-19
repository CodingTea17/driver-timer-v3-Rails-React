import React, { Component } from 'react';
import Driver from './Driver';
import ActionCable from 'actioncable';

class StoreHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drivers: []
    };
  }

  componentDidMount() {
    window.fetch(`/api/stores/${this.props.match.params.id}/drivers`).then(data => {
      data.json().then(res => {
        console.log(res);
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
                count={index + 1}
                latest-time={10}
              />
            ))
          }
      </div>
    );
  }
}

export default StoreHome;
