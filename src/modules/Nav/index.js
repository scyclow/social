// @flow

import React, { Component } from 'react';
import styles from './styles.module.css';

type Props = {};

class Nav extends Component<Props> {
  render() {
    return (
      <div className={styles.spaceHolder}>
        <div className={styles.container}>
          <div className={styles.title}>friendworld.social</div>
        </div>
      </div>
    )
  }
}

export default Nav
