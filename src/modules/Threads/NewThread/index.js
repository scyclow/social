// @flow

import React from 'react'
import { type RouterHistory } from 'react-router-dom'
import { connect } from 'react-redux';
import { actions } from 'ducks/threads'
import styles from './styles.module.css'
import Post from '../Post'

type Props = {
  newThread: typeof actions.newThread,
  groupId: string,
  history: RouterHistory
};

type State = {
  title: string,
  content: string
};

class NewThread extends React.Component<Props, State> {
  state = {
    title: '',
    content: ''
  }

  postNewThread = () => {
    const { history, groupId, newThread } = this.props
    const { title, content } = this.state
    newThread({ authorId: 'user0', title, content, groupId })
    history.push(`/groups/${groupId}`)
  }
  render() {
    const { title, content } = this.state
    return (
      <div>
        <h2 className={styles.sectionTitle}>New Thread</h2>
        <div>
          <h4 className={styles.label}>Title</h4>
          <input
            onChange={e => this.setState({ title: e.target.value })}
            value={title}
            className={styles.titleInput}
          />
          <h4 className={styles.label}>Content</h4>
          <textarea
            onChange={e => this.setState({ content: e.target.value })}
            value={content}
            className={styles.contentInput}
          />
          <button className={styles.button} onClick={this.postNewThread}>Start Thread</button>
        </div>

        {!!(title || content) && (
          <div className={styles.preview}>
            <h4 className={styles.label}>Preview</h4>
            <Post post={{
              title,
              content,
              authorId: 'user0',
              points: 0,
              time: Date.now(),
            }} />
          </div>
        )}
      </div>
    )
  }
}
  // authorId: string,
  // points: number,
  // time: number,
  // title: string,
  // content: string,

export default connect(undefined, {
  newThread: actions.newThread
})(NewThread)
