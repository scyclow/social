// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom'
import { actions as schedulerActions } from 'ducks/scheduler'


import Chat from 'modules/Chat'
import Nav from 'modules/Nav'
import Body from 'modules/Body'
import Groups from 'modules/Groups'
import Group from 'modules/Groups/Group'

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
            <Route exact path="/" render={() => <div>this is the root</div>}/>
            <Route path="/groups" component={Groups} />
            <Route path="/profile" render={() => <div>this is the profile</div>}/>
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
