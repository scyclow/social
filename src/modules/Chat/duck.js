// @flow

import { type Action } from 'types/redux'
import { type ChatId } from 'types/Chat'
import { createReducer } from 'utils/redux'

export type ChatModuleState = {
  listMinimized: boolean,
  chats: {
    [string | ChatId]: {
      windowState: 'open' | 'minimized' | 'closed',
      messageDraft: string
    }
  },
};

const defaultState: ChatModuleState = {
  listMinimized: true,
  chats: {
    chat1: {
      windowState: 'closed',
      messageDraft: ''
    }
  },
}

const MINIMIZE_CHAT_LIST = 'chatModule/MINIMIZE_CHAT_LIST';
const OPEN_CHAT_BOX = 'chatModule/OPEN_CHAT_BOX';
const CLOSE_CHAT_BOX = 'chatModule/CLOSE_CHAT_BOX';
const MINIMIZE_CHAT_BOX = 'chatModule/MINIMIZE_CHAT_BOX';
const UPDATE_MESSAGE_DRAFT = 'chatModule/UPDATE_MESSAGE_DRAFT';

type OpenChatBoxAction = Action<{
  id: ChatId,
}>;

type CloseChatBoxAction = Action<{
  id: ChatId,
}>;

type MinimizeChatBoxAction = Action<{
  id: ChatId,
  windowState: 'minimized' | 'open'
}>;

type UpdateMessageDraftAction = Action<{
  messageDraft: string,
  id: ChatId
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
      payload: { id, windowState: minimized ? 'minimized' : 'open' }
    }
  },
  updateMessageDraft(id: ChatId, messageDraft: string): UpdateMessageDraftAction {
    return {
      type: UPDATE_MESSAGE_DRAFT,
      payload: { messageDraft, id }
    }
  }
}

export const reducer = createReducer({
  [MINIMIZE_CHAT_LIST]: (state: ChatModuleState) => ({
    ...state,
    listMinimized: !state.listMinimized
  }),
  [OPEN_CHAT_BOX]: (state: ChatModuleState, { payload: { id } }) => ({
    ...state,
    chats: {
      ...state.chats,
      [id]: {
        ...state.chats[id],
        windowState: 'open'
      }
    }
  }),
  [CLOSE_CHAT_BOX]: (state: ChatModuleState, { payload: { id } }) => ({
    ...state,
    chats: {
      ...state.chats,
      [id]: {
        ...state.chats[id],
        windowState: 'closed'
      }
    }
  }),
  [MINIMIZE_CHAT_BOX]: (state: ChatModuleState, { payload: { id, windowState } }) =>  ({
    ...state,
    chats: {
      ...state.chats,
      [id]: {
        ...state.chats[id],
        windowState
      }
    }
  }),
  [UPDATE_MESSAGE_DRAFT]: (state: ChatModuleState, { payload: { id, messageDraft } }) =>  ({
    ...state,
    chats: {
      ...state.chats,
      [id]: {
        ...state.chats[id],
        messageDraft
      }
    }
  })
}, defaultState)
