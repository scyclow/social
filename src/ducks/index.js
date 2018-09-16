// @flow

import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { type Store } from 'types/redux'
import { reducer as chats } from './chats'
import { reducer as users } from './users'
import { reducer as bots } from './bots'
import { reducer as scheduler, actions as schedulerActions } from './scheduler'
import { reducer as chatModule } from '../ChatModule/duck'

const REDUX_STATE = '__REDUX_STATE___'

const saveState = (store: *) => (next: *) => (action: *) => {
  const nextAction = next(action);
  const state = store.getState()
  window.localStorage.setItem(REDUX_STATE, JSON.stringify(state))
  return nextAction
}

const getSavedState = () => JSON.parse(localStorage.getItem(REDUX_STATE) || '{}')

const enhancer = compose(
  applyMiddleware(thunk, saveState),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

const rootReducer = combineReducers({ users, chats, bots, scheduler, chatModule })
const store: Store = createStore(rootReducer, getSavedState(), enhancer)

store.dispatch(schedulerActions.handleOutstandingJobs())

export default store
