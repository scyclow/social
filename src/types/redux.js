// @flow
import { type Chats } from 'types/Chat'
import { type Users } from 'types/User'
import { type ChatModuleState } from 'modules/Chat/duck'
import { type BotsState } from 'ducks/bots'
import { type Threads } from 'ducks/threads'
import { type GroupsState } from 'ducks/groups'
import { type SchedulerState } from 'ducks/scheduler'
import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux';

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
