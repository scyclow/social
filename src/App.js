// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions as schedulerActions } from 'ducks/scheduler'


import Chat from 'modules/Chat'
import Nav from 'modules/Nav'
import Body from 'modules/Body'

type Props = {
  handleOutstandingJobs: typeof schedulerActions.handleOutstandingJobs
};

class App extends Component<Props> {
  componentDidMount() {
    this.props.handleOutstandingJobs()
  }

  render() {
    return (
      <div className="App">
        <Nav />
        <Body>
          <div>this is the body</div>
        </Body>
        <Chat />
      </div>
    );
  }
}

export default connect(null, {
  handleOutstandingJobs: schedulerActions.handleOutstandingJobs
})(App);
