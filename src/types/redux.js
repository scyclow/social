// @flow
import { type Chats } from 'types/Chat'
import { type Users } from 'types/User'
import { type ChatModuleState } from '../ChatModule/duck'
import { type BotsState } from '../ducks/bots'
import { type SchedulerState } from '../ducks/scheduler'
import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux';

export type ReduxInitAction = { type: '@@INIT' };

export type State = {
  chats: Chats,
  users: Users,
  chatModule: ChatModuleState,
  scheduler: SchedulerState,
  bots: BotsState
};

export type GetState = () => State;

export type Action<P> = {
  type: string,
  payload: P
};

export type Actions =
  | ReduxInitAction
  | Action<*>;

export type Store = ReduxStore<State, Actions>;

export type Dispatch = ReduxDispatch<Actions | (Dispatch, GetState) => Actions>;
