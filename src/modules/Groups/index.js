// @flow

import * as React from 'react';
import { Link, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import styles from './styles.module.css';

import Group from './Group'


type Props = {
  groups: Object
};

class Groups extends React.Component<Props> {
  render() {
    // should turn links into breadcrums
    return (
      <div className={styles.container}>
        <div className={styles.breadcrumbs}>
          <Link to="/groups">Groups</Link>
          <Route path="/groups/:id" render={({ match: { params: { id } } }) =>
            <Link to={`/groups/${id || ''}`}>{this.props.groups[id].name}</Link>
          }/>
          <Route path="/groups/:groupId/posts/:postId" render={({ match: { params: { groupId, postId } } }) =>
            (!!groupId && !!postId &&
              <Link to={`/groups/${groupId}/posts/${postId}`}>
                {`post ${postId}`}
              </Link>
            )
          }/>
        </div>

        <Link to="/groups/general">general</Link>
        <Link to="/groups/finance">Finance</Link>
        <Link to="/groups/politics">Politics</Link>
        <Link to="/groups/spirituality">Religion & Spirituality</Link>
        <Link to="/groups/dating">Dating</Link>
        <Link to="/groups/sports">Sports</Link>
        <Route exact path="/groups/:groupId" render={({ match }) => <Group id={match.params.groupId || ''} />}/>

      </div>
    )
  }
}

export default connect(state => ({
    groups: {
      general: { name: 'general' },
      finance: { name: 'finance' },
      politics: { name: 'politics' },
      spirituality: { name: 'spirituality&romance' },
      dating: { name: 'dating' },
      sports: { name: 'sports' },
    }
  })
)(Groups)
