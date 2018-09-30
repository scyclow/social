// @flow

import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware,
  type Store as ReduxStore
} from 'redux'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { reducer as chats, type Chats } from './chats'
import { reducer as users, type Users } from './users'
import { reducer as threads, type Threads } from './threads'
import { reducer as groups, type GroupsState } from './groups'
import { reducer as scheduler, type SchedulerState } from './scheduler'
import { reducer as chatModule, type ChatModuleState } from 'modules/Chat/duck'
// $FlowFixMe
import { reducer as bots, type BotsState } from './bots'

export type ReduxInitAction = { type: '@@INIT' };

export type State = {
  chats: Chats,
  chatModule: ChatModuleState,
  threads: Threads,
  gorups: GroupsState,
  users: Users,
  bots: BotsState,
  scheduler: SchedulerState,
  router: mixed
};

export type GetState = () => State;

export type Action<P> = {
  type: string,
  payload: P
};

export type Actions =
  | ReduxInitAction
  | Action<mixed>;

export type Store = ReduxStore<State, Actions>;

export type Dispatch = (Actions | (Dispatch, GetState) => mixed) => mixed;


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
    threads,
    groups,
    scheduler,
    chatModule
  })
)
const store: Store = createStore(rootReducer, getSavedState(), enhancer)

export default store
