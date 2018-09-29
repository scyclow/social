// @flow

import * as React from 'react';
import { Link, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import styles from './styles.module.css';
import { map } from 'lodash';
import { type GroupsState } from 'ducks/groups';
import Thread from 'modules/Threads'

import Group from './Group'


type Props = {
  groups: GroupsState
};

const GroupsBody = ({ groups }: Props) => (
  <div className={styles.body}>
    {map(groups, group => (
      <Link key={group.id} to={`/groups/${group.id}`}>{group.name}</Link>
    ))}
  </div>
)

class Groups extends React.Component<Props> {
  render() {
    // should turn links into breadcrumbs
    const { groups } = this.props
    return (
      <div>
        <div className={styles.breadcrumbs}>
          <Link to="/groups">Groups</Link>

          <Route path="/groups/:id" render={({ match: { params: { id } } }) =>
            <Link to={`/groups/${id || ''}`}>{groups[id || ''].name}</Link>
          }/>

          <Route path="/groups/:groupId/threads/:threadId" render={({ match: { params: { groupId, threadId } } }) =>
            (!!groupId && !!threadId &&
              <Link to={`/groups/${groupId}/threads/${threadId}`}>
                {`thread ${threadId}`}
              </Link>
            )
          }/>
        </div>

        <section className={styles.container}>
          <Route exact path="/groups" render={() =>
            <GroupsBody {...this.props} />
          } />

          <Route exact path="/groups/:groupId" render={({ match }) =>
            <Group id={match.params.groupId || ''} />
          } />

          <Route exact path="/groups/:groupId/threads/:threadId" render={({ match }) =>
            <Thread id={match.params.threadId || ''} />
          } />
        </section>
      </div>
    )
  }
}

export default connect(state => ({
  groups: state.groups
}))(Groups)
