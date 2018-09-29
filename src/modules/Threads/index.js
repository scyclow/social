// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Thread as ThreadType, type Post as PostType } from 'ducks/threads'
import { type State } from 'types/redux'

import styles from './styles.module.css';

// type Post = {
//   author:
// };

type OwnProps = {
  id: string
};

type ReduxProps = {
  thread: ThreadType
};

type Props = OwnProps & ReduxProps;

const Post = ({ post }: { post: PostType }) => (
  <div className={styles.post}>
    <h3>{post.title}</h3>
    <p>{post.content}</p>
  </div>
)

class Thread extends React.Component<Props> {
  render() {
    const { thread } = this.props
    return (
      <div>
        <h2>{thread.posts[0].title}</h2>
        <div>
          {thread.posts.map((post, ix) => <Post post={post} key={ix} />)}
        </div>
      </div>
    )
  }
}

export default connect((state: State, ownProps: OwnProps): ReduxProps => ({
  thread: state.threads[ownProps.id]
}))(Thread)
