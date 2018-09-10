// @flow

import { createStore, combineReducers, compose } from 'redux'
import persistState from 'redux-localstorage'
import { type Store } from 'types/redux'
import { reducer as chats } from './chats'
import { reducer as users } from './users'
import { reducer as chatModule } from '../ChatModule/duck'

const enhancer = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  persistState()
)

const rootReducer = combineReducers({ users, chats, chatModule })
const store: Store = createStore(rootReducer, enhancer)
export default store
