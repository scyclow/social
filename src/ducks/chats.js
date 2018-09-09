// @flow

import { type ChatId, type Chats, createChatId as id } from 'types/Chat'
import { createUserId as uid, type UserId } from 'types/User'
import { createReducer } from 'utils/redux'

const defaultState: Chats = {
  [id('chat1').toString()]: {
    id: id('chat1'),
    history: [
      {
        sender: 'blah',
        time: new Date(),
        message: 'hello this is user1'
      }
    ],
    participantId: uid('user1')
  },
  [id('chat2').toString()]: {
    id: id('chat2'),
    history: [],
    participantId: uid('user2')
  },
  [id('chat3').toString()]: {
    id: id('chat3'),
    history: [],
    participantId: uid('user3')
  },
  [id('chat4').toString()]: {
    id: id('chat4'),
    history: [],
    participantId: uid('user4')
  },
  [id('chat5').toString()]: {
    id: id('chat5'),
    history: [],
    participantId: uid('user5')
  },
}

const NEW_CHAT_MESSSAGE = 'users/NEW_CHAT_MESSSAGE';

type NewChatMessageAction = Action<{
  id: ChatId,
  sender: UserId,
  time: Date,
  message: string
}>;

export const actions = {
  newChatMessage(sender: UserId, id: ChatId, message: string): NewChatMessageAction {
    return {
      type: NEW_CHAT_MESSSAGE,
      payload: { id, sender, time: new Date(), message }
    }
  }
}

export const reducer = createReducer({
  [NEW_CHAT_MESSSAGE]: (state, { payload: { id, sender, time, message } }) => {
    console.log(state, {sender, time, message, id})
    return ({
      ...state,
      [id]: {
        ...state[id],
        history: [...state[id].history, { sender, time, message }]
      }
    })
  }
}, defaultState)
