// @flow

import { type ChatId, type Chats, createChatId as id } from 'types/Chat'
import { createUserId as uid, type UserId } from 'types/User'
import { type Action } from 'types/redux'
import { createReducer } from 'utils/redux'

/* Note:
  - chat behavior should be decided by generators
  - current state of conversation is event sourced from chat history.
*/

const defaultState: Chats = {
  [id('chat1').toString()]: {
    id: id('chat1'),
    history: [
      {
        sender: uid('user1'),
        time: new Date(),
        message: 'hello this is user1'
      }
    ],
    open: true,
    minimized: true,
    participantId: uid('user1')
  },
  [id('chat2').toString()]: {
    id: id('chat2'),
    history: [
      {
        sender: uid('user2'),
        time: new Date(),
        message: 'hello this is user2'
      }
    ],
    open: true,
    minimized: false,
    participantId: uid('user2')
  },
  [id('chat3').toString()]: {
    id: id('chat3'),
    history: [
      {
        sender: uid('user3'),
        time: new Date(),
        message: 'hello this is user3'
      }
    ],
    open: false,
    minimized: true,
    participantId: uid('user3')
  },
}

const NEW_CHAT_MESSSAGE = 'users/NEW_CHAT_MESSSAGE';
const OPEN_CHAT_BOX = 'users/OPEN_CHAT_BOX';
const CLOSE_CHAT_BOX = 'users/CLOSE_CHAT_BOX';
const MINIMIZE_CHAT_BOX = 'users/MINIMIZE_CHAT_BOX';

type NewChatMessageAction = Action<{
  id: ChatId,
  sender: UserId,
  time: Date,
  message: string
}>;

type OpenChatBoxAction = Action<{
  id: ChatId,
}>;

type CloseChatBoxAction = Action<{
  id: ChatId,
}>;

type MinimizeChatBoxAction = Action<{
  id: ChatId,
  minimized: boolean
}>;

export const actions = {
  newChatMessage(sender: UserId, id: ChatId, message: string): NewChatMessageAction {
    return {
      type: NEW_CHAT_MESSSAGE,
      payload: { id, sender, time: new Date(), message }
    }
  },
  openChatBox(id: ChatId): OpenChatBoxAction {
    return {
      type: OPEN_CHAT_BOX,
      payload: { id }
    }
  },
  closeChatBox(id: ChatId): CloseChatBoxAction {
    return {
      type: CLOSE_CHAT_BOX,
      payload: { id }
    }
  },
  minimizeChatBox(id: ChatId, minimized: boolean): MinimizeChatBoxAction {
    return {
      type: MINIMIZE_CHAT_BOX,
      payload: { id, minimized }
    }
  },

}

export const reducer = createReducer({
  [NEW_CHAT_MESSSAGE]: (state: Chats, { payload: { id, sender, time, message } }) => ({
    ...state,
    [id]: {
      ...state[id],
      history: [...state[id].history, { sender, time, message }]
    }
  }),
  [OPEN_CHAT_BOX]: (state: Chats, { payload: { id } }) => ({
    ...state,
    [id]: {
      ...state[id],
      open: true
    }
  }),
  [CLOSE_CHAT_BOX]: (state: Chats, { payload: { id } }) => ({
    ...state,
    [id]: {
      ...state[id],
      open: false
    }
  }),
  [MINIMIZE_CHAT_BOX]: (state: Chats, { payload: { id, minimized } }) =>  ({
    ...state,
    [id]: {
      ...state[id],
      minimized
    }
  })
}, defaultState)
