import React, { Component } from 'react';
import ActionCable from 'actioncable';

class Driver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      last_message: {}
    };
  }

  componentDidMount() {
    window.fetch(`/api/stores/177/drivers/4/last_message`).then(data => {
      data.json().then(last_message => {
        console.log(last_message);
        this.setState({ last_message })
      })
    })
  }

  render() {
    return (
      <div>
        <h1>Your Drivers</h1>
      </div>
    );
  }
}

export default Driver;
