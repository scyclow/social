// @flow

import { type Action } from 'types/redux'
import { type ChatId } from 'types/Chat'
import { createReducer } from 'utils/redux'

export type ChatModuleState = {
  listMinimized: boolean,
  chatStates: {
    [string | ChatId]: 'open' | 'minimized' | 'closed'
  }
};

const defaultState: ChatModuleState = {
  listMinimized: true,
  chatStates: {
    chat1: 'closed'
  }
}

const MINIMIZE_CHAT_LIST = 'chatModule/MINIMIZE_CHAT_LIST';
const OPEN_CHAT_BOX = 'chatModule/OPEN_CHAT_BOX';
const CLOSE_CHAT_BOX = 'chatModule/CLOSE_CHAT_BOX';
const MINIMIZE_CHAT_BOX = 'chatModule/MINIMIZE_CHAT_BOX';

type OpenChatBoxAction = Action<{
  id: ChatId,
}>;

type CloseChatBoxAction = Action<{
  id: ChatId,
}>;

type MinimizeChatBoxAction = Action<{
  id: ChatId,
  chatState: 'minimized' | 'open'
}>;


type MinimizeChatListAction = Action<*>;

export const actions = {
  minimizeChatList(): MinimizeChatListAction {
    return {
      type: MINIMIZE_CHAT_LIST,
      payload: null
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
      payload: { id, chatState: minimized ? 'minimized' : 'open' }
    }
  },
}

export const reducer = createReducer({
  [MINIMIZE_CHAT_LIST]: (state: ChatModuleState) => ({
    ...state,
    listMinimized: !state.listMinimized
  }),
  [OPEN_CHAT_BOX]: (state: ChatModuleState, { payload: { id } }) => ({
    ...state,
    chatStates: {
      ...state.chatStates,
      [id]: 'open'
    }
  }),
  [CLOSE_CHAT_BOX]: (state: ChatModuleState, { payload: { id } }) => ({
    ...state,
    chatStates: {
      ...state.chatStates,
      [id]: 'closed'
    }
  }),
  [MINIMIZE_CHAT_BOX]: (state: ChatModuleState, { payload: { id, chatState } }) =>  ({
    ...state,
    chatStates: {
      ...state.chatStates,
      [id]: chatState
    }
  })
}, defaultState)
