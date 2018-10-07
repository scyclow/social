// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import ParsedText from 'components/ParsedText'
import { type User } from 'ducks/users';
import { type Post as PostType } from 'ducks/threads'
import { type State } from 'ducks'

import styles from './styles.module.css';

type OwnProps = { post: PostType };
type Props = OwnProps & { user: User };

const Post = ({ post, user }: Props) => (
  <div className={styles.container}>
    <div className={styles.header}>
      {post.title}
    </div>
    <div className={styles.main}>
      <div className={styles.panel}>
        <div className={styles.avatar} />
        {user.name}
      </div>
      <p className={styles.content}>
        <ParsedText content={post.content} />
      </p>
    </div>
  </div>
)

export default connect((state: State, ownProps: OwnProps) => ({
  user: state.users[ownProps.post.authorId]
}))(Post)
