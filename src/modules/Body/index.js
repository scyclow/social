// @flow

import * as React from 'react';
import styles from './styles.module.css';

type Props = {
  children: React.Node
};

class Body extends React.Component<Props> {
  render() {
    return (
      <div className={styles.container}>
        {this.props.children}
      </div>
    )
  }
}

export default Body
