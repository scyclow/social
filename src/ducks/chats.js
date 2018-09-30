// @flow

import { type Dispatch, type GetState } from 'ducks'
import { createReducer } from 'utils/redux'
// $FlowFixMe
import { actions as botActions } from './bots'

import { type UserId } from './users'

// fuck it
// export opaque type ChatId: string = string;
export type ChatId = string;

export type ChatMessage = {
  sender: UserId,
  time: number,
  message: string
};

export type Chat = {
  id: ChatId,
  botId: UserId,
  history: Array<ChatMessage>
};

export type Chats = {
  [ChatId]: Chat
};



const defaultState: Chats = {
  chat1: {
    id: 'chat1',
    history: [],
    botId: 'bot1'
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


const NEW_CHAT_MESSSAGE = 'chats/NEW_CHAT_MESSSAGE';

// type NewChatMessageAction = Action<{
//   id: ChatId,
//   sender: UserId,
//   time: Date,
//   message: string
// }>;



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


}

export const reducer = createReducer({
  [NEW_CHAT_MESSSAGE]: (state: Chats, { payload: { id, sender, time, message } }) => ({
    ...state,
    [id]: {
      ...state[id],
      history: [...state[id].history, { sender, time, message }]
    }
  }),
}, defaultState)
