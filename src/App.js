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
              <div>this is the root</div>
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
