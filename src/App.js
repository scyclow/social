// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom'
import { actions as schedulerActions } from 'ducks/scheduler'


import Chat from 'modules/Chat'
import Nav from 'modules/Nav'
import Body from 'modules/Body'
import Groups from 'modules/Groups'

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
          <Switch>
            <Route exact path="/">
              <div>
                <div>Welcome to friendworld.social! I remember a time when the world wide web was a magical place, full of discover and authentic conversation. Back then, the internet pulled people together instead fo tearing them apart.</div>
                <div>If you're here, that means you've been invited to participate in the exclusive friendworld.social beta community pilot. </div>
              </div>
            </Route>

            <Route path="/profile">
              <div>this is the profile</div>
            </Route>

            <Route path="/groups" component={Groups} />
          </Switch>

        </Body>
        <Chat />
      </div>
    );
  }
}

export default withRouter(
  connect(null, {
    handleOutstandingJobs: schedulerActions.handleOutstandingJobs
  })(App)
)
