// @flow

import { createStore, combineReducers } from 'redux'
import { type Store } from 'types/redux'
import { type Users } from 'types/User'
import { reducer as chats } from './chats'
import { reducer as users } from './users'


const rootReducer = combineReducers({ users, chats })
const store: Store = createStore(rootReducer)
export default store
