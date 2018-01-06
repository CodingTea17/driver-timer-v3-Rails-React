import React, { Component } from 'react';
import { Sidebar, Menu, Segment, Grid, Button, Header, Modal } from 'semantic-ui-react'

import Driver from './Driver';

// const driverStyle = {
//   width: '33%'
// };

class StoreHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
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

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  render() {
    const { visible } = this.state;

    return (
      <div style={ {textAlign: "center"} }>
        <div style={ {backgroundColor: '#b71c1c', height: '4em', color: 'white'} }>
          <p style={ {height: '100%', fontSize: '3em', fontWeight: '800', paddingBottom: '0.5px'} }>Your Drivers</p>
        </div>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='scale down' width='thin' visible={ visible } icon='labeled' vertical inverted>
            <Menu.Item name='newdriver'>
              <Modal trigger={<Button>Add Driver</Button>}>
                <Modal.Header>Add a New Driver</Modal.Header>
                <Modal.Content>
                  <Modal.Description>
                    <p>I am a new driver form</p>
                  </Modal.Description>
                </Modal.Content>
              </Modal>
            </Menu.Item>
            <Menu.Item name='driverlist'>
              List of current drivers
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <Button onClick={this.toggleVisibility}>Toggle Visibility</Button>
              <Grid columns={4}>
                <Grid.Row>
                  {
                    // Make sure there are any drivers for the store
                    // TODO: It would be cool to render an example driver or something if a store has no drivers
                    (this.state.drivers && this.state.drivers.length) && this.state.drivers.map((driver, index) => (
                      <Grid.Column key={driver.id}>
                        <Driver
                          driver={driver}
                          storeNumber={this.state.store_number}
                          count={index + 1}
                        />
                      </Grid.Column>
                    ))
                  }
                </Grid.Row>
              </Grid>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default StoreHome;
