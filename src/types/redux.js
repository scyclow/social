// @flow
import { type Chats } from 'types/Chat'
import { type Users } from 'types/User'
import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux';

export type ReduxInitAction = { type: '@@INIT' };

export type State = { chats: Chats, users: Users };

export type Action<P> = {
  type: string,
  payload: P
};

export type Actions =
  | ReduxInitAction;

export type Store = ReduxStore<State, Actions>;

export type Dispatch = ReduxDispatch<Actions>;
