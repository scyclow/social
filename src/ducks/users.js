// @flow

import { createReducer } from 'utils/redux'
import { type Action } from 'ducks'

export const INVALID_USER_CHARS = ['?', '%', '@']

export type UserId = string;

export type User = {
  id: UserId,
  name: string,
  onlineNow: boolean
};

export type Users = {
  [UserId]: User
};

const defaultState: Users = {
  user0: {
    id: 'user0',
    name: 'steve',
    onlineNow: true
  },
  bot1: {
    id: 'bot1',
    name: 'steve',
    onlineNow: true
  },
  bot2: {
    id: 'bot2',
    name: 'tom',
    onlineNow: false
  },
  bot3: {
    id: 'bot3',
    name: 'max',
    onlineNow: false
  },
  bot4: {
    id: 'bot4',
    name: 'peter',
    onlineNow: true
  },
  bot5: {
    id: 'bot5',
    name: 'bil',
    onlineNow: true
  },
}

const SET_ONLINE = 'users/SET_ONLINE';

type SetOnlineAction = Action<{
  id: UserId,
  online: boolean
}>;

export const actions = {
  setOnline(id: UserId, online: boolean): SetOnlineAction {
    return {
      type: SET_ONLINE,
      payload: { id, online }
    }
  }
}
export const reducer = createReducer({
  [SET_ONLINE]: (state, action) => ({
    ...state,
    [state[action.payload.id]]: {
      ...state[action.payload.id],
      online: action.payload.online
    }
  })
}, defaultState)
