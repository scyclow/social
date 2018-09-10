// @flow

import { type Action } from 'types/redux'
import { createReducer } from 'utils/redux'

export type ChatModuleState = {
  listMinimized: boolean,
};

const defaultState: ChatModuleState = {
  listMinimized: true,
}

const MINIMIZE_CHAT_LIST = 'chatModule/MINIMIZE_CHAT_LIST';


type MinimizeChatListAction = Action<*>;

export const actions = {
  minimizeChatList(): MinimizeChatListAction {
    return {
      type: MINIMIZE_CHAT_LIST,
      payload: null
    }
  },
}

export const reducer = createReducer({
  [MINIMIZE_CHAT_LIST]: (state: ChatModuleState) => ({
    ...state,
    listMinimized: !state.listMinimized
  })
}, defaultState)
