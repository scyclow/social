import React, { Component } from 'react';
import ChatModule from './ChatModule'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div style={{cursor: 'pointer', height: '100vh', width: '100vw'}}/>
        <ChatModule />
      </div>
    );
  }
}

export default App;
