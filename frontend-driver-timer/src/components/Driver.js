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
        this.setState({ last_message })
      })
    })
  }

  render() {
    return (
      <div>
        {this.state.last_message.text}
      </div>
    );
  }
}

export default Driver;
