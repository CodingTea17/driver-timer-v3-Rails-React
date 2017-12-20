import React, { Component } from 'react';
import ActionCable from 'actioncable';

class Driver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      last_message: {},
      driver: this.props.driver,
      store_number: this.props.store_number
    };
  }

  componentDidMount() {
    window.fetch(`/api/stores/${this.state.store_number}/drivers/${this.state.driver.id}/last_message`).then(data => {
      data.json().then(last_message => {
        this.setState({ last_message })
      })
    })
    const cable = ActionCable.createConsumer('ws://localhost:3001/cable')
    this.sub = cable.subscriptions.create('DriverMessagesChannel', {
      received: this.handleReceiveNewDriverMessage
    })
  }

  handleReceiveNewDriverMessage = ({ new_driver_message }) => {
    if (new_driver_message.driver_id === this.state.driver.id ) {
      window.fetch(`/api/messages/${new_driver_message.message_id}`).then(data => {
        data.json().then(new_message => {
          console.log(new_message)
          this.setState({ last_message: new_message })
        })
      })
    }
    // let updated_stores = this.state.stores.concat(new_store);
    // this.setState({ stores: updated_stores })
  }

  render() {
    return (
      <div>
        <h2>{this.state.driver.name}</h2>
        <h5>{this.state.last_message.text}</h5>
      </div>
    );
  }
}

export default Driver;
