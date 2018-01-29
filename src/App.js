import React, { Component } from 'react';
import {appKey,serverURL} from './configs'
import HomeContainer from './containers/homeContainer';
import Parse from 'parse'


//Initialise parse
Parse.initialize(appKey);
Parse.serverURL = serverURL;

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
