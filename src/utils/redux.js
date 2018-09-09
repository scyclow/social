// @flow

import type { Action } from 'types/redux';

type Reducer<S> = (state: S, action: Action<*>) => S;

export function createReducer<S>(
  actions: {
    [string]: Reducer<S>
  },
  defaultState: S
): Reducer<S> {
  return (state, action) => {
    for (const actionType in actions) {
      if (action.type === actionType) return actions[actionType](state, action);
    }
    return state || defaultState;
  };
}
