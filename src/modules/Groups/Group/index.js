// @flow

import * as React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { selectors as threadSelectors, type Thread } from 'ducks/threads'
import { type Group as GroupType } from 'ducks/groups'
import { map } from 'lodash'

import styles from './styles.module.css';

type Props = {
  group: GroupType,
  threads: Array<Thread>
};

const ThreadPost = ({ thread, groupId }) => (
  <div>
    <Link to={`/groups/${groupId}/threads/${thread.id}`}>
      {thread.posts[0].title}
    </Link>
  </div>
)

class Group extends React.Component<Props> {
  render() {
    const { group, threads } = this.props
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>{group.name}</h2>
          <Link to={`/groups/${group.id}/newThread`}>Add a thread!</Link>
        </div>
        {map(threads, thread =>
          <ThreadPost key={thread.id} thread={thread} groupId={group.id} />
        )}
      </div>
    )
  }
}

export default connect((state, ownProps) => ({
  threads: threadSelectors.getThreadsForGroup(state, ownProps.id),
  group: state.groups[ownProps.id]
}))(Group)
