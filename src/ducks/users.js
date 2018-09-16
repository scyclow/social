// @flow

import { type UserId, type Users, createUserId as id } from 'types/User'
import { createReducer } from 'utils/redux'
import { type Action } from 'types/redux'

const defaultState: Users = {
  [id('bot1').toString()]: {
    id: id('bot1'),
    name: 'steve',
    onlineNow: true
  },
  [id('bot2').toString()]: {
    id: id('bot2'),
    name: 'tom',
    onlineNow: false
  },
  [id('bot3').toString()]: {
    id: id('bot3'),
    name: 'max',
    onlineNow: false
  },
  [id('bot4').toString()]: {
    id: id('bot4'),
    name: 'peter',
    onlineNow: true
  },
  [id('bot5').toString()]: {
    id: id('bot5'),
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
