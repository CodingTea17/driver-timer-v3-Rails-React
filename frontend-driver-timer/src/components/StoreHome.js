import React, { Component } from 'react';
import { Icon, Sidebar, Menu, Segment, Grid, Button, Header, Modal } from 'semantic-ui-react'

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

  handleDeleteDriver = (driver_id) => {
    console.log("deleted", driver_id);
  }

  render() {
    const { visible } = this.state;

    return (
      <div style={ {textAlign: "center"} }>
        <Menu inverted borderless={true} style={{borderRadius: "0", margin: "0"}}>
          <Menu.Item>
            <Icon inverted name="list layout" size="large" onClick={this.toggleVisibility} />
          </Menu.Item>
          <Menu.Item>
            <h1>Store {this.state.store_number}</h1>
          </Menu.Item>
        </Menu>
        <Sidebar.Pushable as={Segment} style={{margin: "0"}}>
          <Sidebar as={Menu} animation='scale down' width='thin' visible={visible} icon='labeled' vertical inverted>
            <Menu.Item name='newdriver'>
              <Modal trigger={<Button inverted>Add Driver</Button>}>
                <Modal.Header>Add a New Driver</Modal.Header>
                <Modal.Content>
                  <Modal.Description>
                    <p>I am a new driver form</p>
                  </Modal.Description>
                </Modal.Content>
              </Modal>
            </Menu.Item>
            <div style={{overflow: "auto"}}>
              {
                (this.state.drivers && this.state.drivers.length) && this.state.drivers.map((driver, index) => (
                  <Menu.Item key={driver.id} style={{textAlign: "left"}}>
                    <Icon
                      style={{display: "inline-block"}}
                      name="minus square outline"
                      size="large"
                      onClick={this.handleDeleteDriver(driver.id)}
                    />
                    <div style={{display: "inline-block", verticalAlign: "baseline", fontSize: "18px", float: "right"}}>
                      {driver.name}
                    </div>
                  </Menu.Item>
                ))
              }
            </div>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
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


// <div style={ {backgroundColor: '#b71c1c', height: '4em', color: 'white'} }>
//   <p style={ {height: '100%', fontSize: '3em', fontWeight: '800', paddingBottom: '0.5px'} }>Your Drivers</p>
// </div>
