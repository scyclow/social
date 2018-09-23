// @flow

import * as React from 'react';
import styles from './styles.module.css';

type Props = {
  id: string
};

// TODO connect group to duck that looks up group id and gets group
// add some redux store normalzer thing where, for an object witht he structure:
  // {
  //   something
  //   somethingElse: {
  //     id
  //   }
  // }
// it creates a proxy thing that allows you to get properties like such:
  // {
  //   something
  //   somethingElse: {
  //     id
      // more stuff
      // andAnotherThing
  //   }
  // }

class Group extends React.Component<Props> {
  render() {
    return (
      <div className={styles.container}>
        Hello! Welcome to the {this.props.id} page!
        {JSON.stringify(this.props)}
      </div>
    )
  }
}

export default Group
