import React, { Component } from 'react';
import Sound from 'react-sound';
import Clock from './Clock';
import notification from './notification_sound.mp3';
import ActionCable from 'actioncable';

class Driver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      last_message: {},
      driver: this.props.driver,
      store_number: this.props.storeNumber,
      play_sound: false
    };
  }

  componentDidMount() {
    window.fetch(`/api/stores/${this.state.store_number}/drivers/${this.state.driver.id}/last_message`).then(data => {
      data.json().then(last_message => {
        const estimatedReturnTime = Date.parse(last_message.message_timestamp) + (last_message.text * 60 * 1000);
        // console.log("est Time:", (new Date(estimatedReturnTime)).toUTCString());
        // console.log("sent Time:", (new Date(last_message.message_timestamp).toUTCString()));
        this.setState({
          last_message,
          estimatedReturnTime
        });
      })
    })
    const cable = ActionCable.createConsumer('ws://localhost:3001/cable')
    this.sub = cable.subscriptions.create('DriverMessagesChannel', {
      received: this.handleReceiveNewDriverMessage
    })
  }

  handleReceiveNewDriverMessage = ({ new_driver_message }) => {
    if (new_driver_message.driver_id === this.state.driver.id ) {
      this.setState({ play_sound: false })
      window.fetch(`/api/messages/${new_driver_message.message_id}`).then(data => {
        data.json().then(new_message => {
          const estimatedReturnTime = Date.parse(new_message.message_timestamp) + (new_message.text * 60 * 1000);
          this.setState({
            estimatedReturnTime,
            last_message: new_message,
            play_sound: true
          })
        })
      })
    }
  }

  hasNotified = () => {
    this.setState({ play_sound: false })
  }

  render() {
    return (
      <div>
        <h2>{ this.state.driver.name }</h2>
        { this.state.play_sound && <Sound
                                      url={ notification }
                                      playStatus={ Sound.status.PLAYING }
                                      onFinishedPlaying={ this.hasNotified }
                                    />
        }

        <Clock
          returnTime={ new Date(this.state.estimatedReturnTime) }
          sentTime={ new Date(this.state.last_message.message_timestamp) }
        />
      </div>
    );
  }
}

export default Driver;
