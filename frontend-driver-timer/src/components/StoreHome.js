import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import Driver from './Driver';

// const driverStyle = {
//   width: '33%'
// };

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
      <div style={ {textAlign: "center"} }>
        <div style={ {backgroundColor: '#b71c1c', height: '4em', color: 'white', marginBottom: '2em'} }>
          <p style={ {height: '100%', fontSize: '3em', fontWeight: '800', paddingBottom: '0.5px'} }>Your Drivers</p>
        </div>
        <Grid container columns={4}>
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
      </div>
    );
  }
}

export default StoreHome;
