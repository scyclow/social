// @flow

import { createReducer } from 'utils/redux'
import { type Action, type State } from 'types/redux'
import uuid from 'uuid/v4';
import u from 'updeep'
import { filter } from 'lodash'


export type Post = {
  authorId: string,
  points: number,
  // isOp: boolean,
  time: number,
  title: string,
  content: string,
};

export type Thread = {
  id: string,
  locked?: boolean,
  groupId: string,
  posts: Array<Post>
};

export type Threads = {
  [id: string]: Thread
};

const defaultState: Threads = {
  '1': {
    id: '1',
    locked: false,
    groupId: 'general',
    posts: [{
      authorId: 'user0',
      points: 5,
      // isOp: true,
      time: Date.now(),
      title: 'How much time have you wasted?',
      content: `how much time do you think you spend on the internet every day? how much do you spend in a week? a month? a year? now, how much of that time would you say was *meaningful*? i'm talking about time spent in a way that you'll look back in 10 years with no regrets. maybe you learned something from a wikipedia rabit hole. maybe you engaged in a thoughtful discussion. maybe you experienced some memorable art. people find meaning in all sorts of things, and whatever does it for you is fine. now, how much of that time spent would you consider *wasted*? mindlessly clicking around? browsing back and forth between the same four websites...`
    }]
  },
  '2': {
    id: '2',
    groupId: 'finance',
    locked: false,
    posts: [
      {
        authorId: 'user0',
        time: Date.now(),
        points: 1,
        title: 'Report on FCMP',
        content: 'look at this fakebullshit.news article'
      }
    ]
  },
  '3': {
    id: '3',
    groupId: 'politics',
    locked: false,
    posts: [
      {
        authorId: 'user0',
        time: Date.now(),
        points: 1,
        title: 'Report on FCMP',
        content: 'of course fakebullshit.news is reputable. even finance is talking about it'
      }
    ]
  }
}

const NEW_THREAD = 'threads/NEW_THREAD';
const NEW_POST = 'threads/NEW_POST';
const POST_VOTE = 'threads/POST_VOTE';

type PostVoteArgs = {
  threadId: string,
  postIx: number,
  vote: -1 | 1
};

type NewThreadAction = Action<Post & { id: string, groupId: string }>;
type NewPostAction = Action<Post & { threadId: string }>;
type PostVoteAction = Action<PostVoteArgs>;

type NewThreadArgs = {
  authorId: string,
  title: string,
  content: string,
  groupId: string
};

type NewPostArgs = {
  authorId: string,
  title: string,
  content: string,
  threadId: string
};

export const actions = {
  newThread({ authorId, title, content, groupId }: NewThreadArgs): NewThreadAction {
    const id = uuid()
    return {
      type: NEW_THREAD,
      payload: {
        id,
        authorId,
        title,
        content,
        groupId,
        time: Date.now(),
        points: 0
      }
    }
  },
  newPost({ authorId, title, content, threadId }: NewPostArgs): NewPostAction {
    return {
      type: NEW_POST,
      payload: {
        authorId,
        title,
        content,
        time: Date.now(),
        points: 0,
        threadId
      }
    }
  },
  postVote({ threadId, postIx, vote }: PostVoteArgs): PostVoteAction {
    return {
      type: POST_VOTE,
      payload: { threadId, postIx, vote }
    }
  }
}

export const reducer = createReducer({
  [NEW_THREAD]: (state: Threads, { payload: { groupId, id, authorId, title, content, time, points } }) =>
    u({
      [id]: {
        id,
        groupId,
        locked: false,
        posts: [{ authorId, title, content, time, points }]
      }
    }, state),

  [NEW_POST]: (state: Threads, { payload: { threadId, authorId, title, content, time, points } }) =>
    u({
      [threadId]: {
        posts: p => [...p, { authorId, title, content, time, points }]
      }
    }, state),

  [POST_VOTE]: (state: Threads, { payload: { threadId, postIx, vote } }) =>
    u({
      [threadId]: {
        posts: {
          [postIx]: { vote: v => v + vote }
        }
      }
    }, state)
}, defaultState)

export const selectors = {
  getThreadsForGroup: (state: State, groupId: string): Array<Thread> =>
   filter(state.threads, { groupId })
}
