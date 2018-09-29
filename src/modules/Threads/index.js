// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Thread as ThreadType, type Post as PostType } from 'ducks/threads'
import { type User } from 'types/User';
import { type State } from 'types/redux'

import styles from './styles.module.css';


type PostOwnProps = { post: PostType };
type PostProps = PostOwnProps & { user: User };

const Post = connect((state: State, ownProps: PostOwnProps) => ({
  user: state.users[ownProps.post.authorId]
}))
(({ post, user }: PostProps) => (
  <div className={styles.post}>
    <div className={styles.postHeader}>
      {post.title}
    </div>
    <div className={styles.postMain}>
      <div className={styles.postPanel}>
        <div className={styles.avatar} />
        {user.name}
      </div>
      <p className={styles.postContent}>
        {post.content}
      </p>
    </div>
  </div>
))


type OwnProps = {
  id: string
};

type ReduxProps = {
  thread: ThreadType
};

type Props = OwnProps & ReduxProps;

class Thread extends React.Component<Props> {
  render() {
    const { thread } = this.props
    return (
      <div>
        <h2 className={styles.threadTitle}>{thread.posts[0].title}</h2>
        <div>
          {thread.posts.map((post, ix) => <Post post={post} key={ix} />)}
        </div>
        <div>
          <textarea></textarea>
        </div>
      </div>
    )
  }
}

export default connect((state: State, ownProps: OwnProps): ReduxProps => ({
  thread: state.threads[ownProps.id]
}))(Thread)
