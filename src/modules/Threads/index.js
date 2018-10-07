// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { last } from 'lodash'
import { type Thread as ThreadType, type Post as PostType, actions as threadActions } from 'ducks/threads'
import { type User } from 'ducks/users';
import { type State } from 'ducks'

import styles from './styles.module.css';


type PostOwnProps = { post: PostType };
type PostProps = PostOwnProps & { user: User };

const Post = connect((state: State, ownProps: PostOwnProps) => ({
  user: state.users[ownProps.post.authorId]
})
)(({ post, user }: PostProps) => (
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
  thread: ThreadType,
  newPost: typeof threadActions.newPost
};

type Props = OwnProps & ReduxProps;

type ComponentState = {
  content: string
};

class Thread extends React.Component<Props, ComponentState> {
  state = {
    content: ''
  }

  render() {
    const { thread, newPost } = this.props
    return (
      <div>
        <h2 className={styles.threadTitle}>{thread.posts[0].title}</h2>
        <div>
          {thread.posts.map((post, ix) => <Post post={post} key={ix} />)}
        </div>
        <div>
          <textarea
            className={styles.contentInput}
            placeholder="Add a comment"
            onChange={e => this.setState({ content: e.target.value })}
            value={this.state.content}
          />
          <button
            className={styles.submitButton}
            onClick={() => {
              newPost({
                authorId: 'user0',
                title: 'Re: ' + last(thread.posts).title,
                content: this.state.content,
                threadId: thread.id
              })
              this.setState({ content: '' })
            }}
          >
            submit post
          </button>
        </div>
      </div>
    )
  }
}

export default connect((state: State, ownProps: OwnProps) => ({
  thread: state.threads[ownProps.id]
}), {
  newPost: threadActions.newPost
})(Thread)
