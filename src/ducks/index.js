// @flow

import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'
import { type Store } from 'types/redux'
import { reducer as chats } from './chats'
import { reducer as users } from './users'
import { reducer as bots } from './bots'
import { reducer as scheduler, actions as schedulerActions } from './scheduler'
import { reducer as chatModule } from '../ChatModule/duck'

const enhancer = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  persistState(),
)

const rootReducer = combineReducers({ users, chats, bots, scheduler, chatModule })
const store: Store = createStore(rootReducer, enhancer)

store.dispatch(schedulerActions.handleOutstandingJobs())

export default store
