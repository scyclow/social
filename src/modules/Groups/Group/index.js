// @flow

import * as React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { selectors as threadSelectors } from 'ducks/threads'
import { map } from 'lodash'

import styles from './styles.module.css';

type Props = any;//{
  // id: string
//};

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
        <h2>{group.name}</h2>
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
