// @flow

import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { type Store } from 'types/redux'
import { reducer as chats } from './chats'
import { reducer as users } from './users'
// $FlowFixMe
import { reducer as bots } from './bots'
import { reducer as scheduler } from './scheduler'
import { reducer as chatModule } from 'modules/Chat/duck'

const REDUX_STATE = '__REDUX_STATE___'

const saveState = (store: *) => (next: *) => (action: *) => {
  const nextAction = next(action);
  const state = store.getState()
  window.localStorage.setItem(REDUX_STATE, JSON.stringify(state))
  return nextAction
}

const getSavedState = () => JSON.parse(localStorage.getItem(REDUX_STATE) || '{}')

export const history = createBrowserHistory()

const enhancer = compose(
  applyMiddleware(thunk, saveState, routerMiddleware(history)),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

const withHistory = connectRouter(history)

const rootReducer = withHistory(
  combineReducers({
    users,
    chats,
    bots,
    scheduler,
    chatModule
  })
)
const store: Store = createStore(rootReducer, getSavedState(), enhancer)

export default store
