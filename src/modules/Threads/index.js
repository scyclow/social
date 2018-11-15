// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { last } from 'lodash'
import { type Thread as ThreadType, actions as threadActions } from 'ducks/threads'
import { type State } from 'ducks'
import Post from './Post'

import styles from './styles.module.css';


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
            placeholder="Join the conversation..."
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
            Post Reply
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
