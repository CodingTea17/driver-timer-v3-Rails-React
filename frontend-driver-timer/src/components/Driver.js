import React, { Component } from 'react';
import Sound from 'react-sound';
import ReactCountdownClock from 'react-countdown-clock';
import notification from './notification_sound.mp3';
import ActionCable from 'actioncable';

class Driver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      last_message: {},
      driver: this.props.driver,
      store_number: this.props.storeNumber,
      play_sound: false,
      display_countdown: false,
      countdownPaused: false
    };
  }

  componentDidMount() {
    window.fetch(`/api/stores/${this.state.store_number}/drivers/${this.state.driver.id}/last_message`).then(data => {
      data.json().then(last_message => {
        const now = new Date().getTime();
        const estimatedReturnTime = Date.parse(last_message.message_timestamp) + (last_message.text * 60 * 1000);
        if (now < estimatedReturnTime) {
          this.setState({
            last_message,
            secondsToReturn: ((estimatedReturnTime - now) / 1000),
            countdownPaused: false,
            display_countdown: true
          })
        } else {
          this.setState({
            last_message,
            countdownPaused: true,
            display_countdown: true
          });
        }
      })
    })
    const cable = ActionCable.createConsumer('ws://localhost:3001/cable')
    this.sub = cable.subscriptions.create('DriverMessagesChannel', {
      received: this.handleReceiveNewDriverMessage
    })
  }

  handleReceiveNewDriverMessage = ({ new_driver_message }) => {
    if (new_driver_message.driver_id === this.state.driver.id ) {
      this.setState({
        play_sound: false,
        display_countdown: false
      })
      window.fetch(`/api/messages/${new_driver_message.message_id}`).then(data => {
        data.json().then(new_message => {
          this.setState({
            last_message: new_message,
            play_sound: true,
            display_countdown: true,
            countdownPaused: false,
            secondsToReturn: (parseInt(new_message.text, 10) * 60)
          })
        })
      })
    }
  }

  hasNotified = () => {
    this.setState({ play_sound: false })
  }

  hasCountedDown = () => {
    this.setState({ display_countdown: false });
    this.setState({ countdownPaused: true, display_countdown: true });
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
        { this.state.display_countdown && <ReactCountdownClock
                                          seconds={ this.state.secondsToReturn }
                                          showMilliseconds={ false }
                                          color="#000"
                                          alpha={ 0.9 }
                                          size={ 250 }
                                          paused={ this.state.countdownPaused }
                                          pausedText={ "00:00" }
                                          onComplete={ this.hasCountedDown }
                                          weight={ 33 }
                                        />
        }
      </div>
    );
  }
}

export default Driver;
