// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import styles from './styles.module.css';

type Props = {};

class Nav extends Component<Props> {
  render() {
    return (
      <nav className={styles.spaceHolder}>
        <div className={styles.container}>
          <Link to="/">
            <div className={styles.title}>friendworld.social</div>
          </Link>
          <div className={styles.links}>
            <Link to="/groups" className={styles.link}>Groups</Link>
            <Link to="/profile" className={styles.link}>Profile</Link>
          </div>
        </div>
      </nav>
    )
  }
}

export default Nav
