import React, { Component } from 'react';
import HomeContainer from './containers/homeContainer';
import Parse from 'parse'


//Initialise parse
Parse.initialize('newYorkerApi');
Parse.serverURL = 'https://appdev.newyorker.de/api'

class App extends Component {
  render() {
    return (
      <div className="App">
        <HomeContainer />
      </div>
    );
  }
}

export default App;
