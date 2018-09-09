// @flow

import { type UserId, type Users, createUserId as id } from 'types/User'
import { createReducer } from 'utils/redux'
import { type Action } from 'types/redux'

const defaultState: Users = {
  [id('user1').toString()]: {
    id: id('user1'),
    name: 'steve',
    onlineNow: true
  },
  [id('user2').toString()]: {
    id: id('user2'),
    name: 'tom',
    onlineNow: false
  },
  [id('user3').toString()]: {
    id: id('user3'),
    name: 'max',
    onlineNow: false
  },
  [id('user4').toString()]: {
    id: id('user4'),
    name: 'peter',
    onlineNow: true
  },
  [id('user5').toString()]: {
    id: id('user5'),
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
