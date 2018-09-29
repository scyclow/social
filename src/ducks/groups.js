// @flow

import { createReducer } from 'utils/redux'

export type GroupsState = {
  [id: string]: {
    name: string,
    id: string,
  }
};


const defaultState: GroupsState = {
  general: {
    id: 'general',
    name: 'general'
  },
  finance: {
    id: 'finance',
    name: 'finance'
  },
  politics: {
    id: 'politics',
    name: 'politics'
  },
  spirituality: {
    id: 'spirituality',
    name: 'spirituality&romance'
  },
  dating: {
    id: 'dating',
    name: 'dating'
  },
  sports: {
    id: 'sports',
    name: 'sports'
  },
}

export const reducer = createReducer({}, defaultState)
