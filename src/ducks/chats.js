// @flow

import { type ChatId, type Chats, createChatId as id } from 'types/Chat'
import { createUserId as uid, type UserId } from 'types/User'
import { type Action, type Dispatch, type GetState } from 'types/redux'
import { createReducer } from 'utils/redux'
import { actions as botActions } from './bots'

/* Note:
  - chat behavior should be decided by generators
  - current state of conversation is event sourced from chat history.
*/

const defaultState: Chats = {
  [id('chat1').toString()]: {
    id: id('chat1'),
    history: [],
    open: false,
    minimized: false,
    botId: uid('bot1')
  },
  // [id('chat2').toString()]: {
  //   id: id('chat2'),
  //   history: [
  //     {
  //       sender: uid('bot2'),
  //       time: new Date(),
  //       message: 'hello this is bot2'
  //     }
  //   ],
  //   open: true,
  //   minimized: false,
  //   botId: uid('bot2')
  // },
  // [id('chat3').toString()]: {
  //   id: id('chat3'),
  //   history: [
  //     {
  //       sender: uid('bot3'),
  //       time: new Date(),
  //       message: 'hello this is bot3'
  //     }
  //   ],
  //   open: false,
  //   minimized: true,
  //   botId: uid('bot3')
  // },
}


const NEW_CHAT_MESSSAGE = 'users/NEW_CHAT_MESSSAGE';
const OPEN_CHAT_BOX = 'users/OPEN_CHAT_BOX';
const CLOSE_CHAT_BOX = 'users/CLOSE_CHAT_BOX';
const MINIMIZE_CHAT_BOX = 'users/MINIMIZE_CHAT_BOX';

// type NewChatMessageAction = Action<{
//   id: ChatId,
//   sender: UserId,
//   time: Date,
//   message: string
// }>;

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
  rawChatMessage(sender: UserId, chatId: ChatId, message: string) {
    return {
      type: NEW_CHAT_MESSSAGE,
      payload: { id: chatId, sender, time: Date.now(), message }
    }
  },
  newChatMessage(sender: UserId, chatId: ChatId, message: string) {
    return (dispatch: Dispatch, getState: GetState) => {
      if (sender === 'user0') {
        const { chats } = getState()
        const { botId } = chats[chatId]
        dispatch(botActions.messageToBot(botId, chatId, message))
      }
      dispatch(actions.rawChatMessage(sender, chatId, message))
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
