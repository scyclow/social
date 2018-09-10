// @flow

import { type ChatId } from 'types/Chat'
import { type Action } from 'types/redux'
import { createReducer } from 'utils/redux'

type BotVars = {
  next: string,
  [botVar: string]: mixed
};

type BotState = {
  [ChatId]: BotVars
};

const defaultState: BotState = {}

const START_BOT = 'bots/START_BOT'
const UPDATE_BOT_VARS = 'bots/UPDATE_BOT_VARS'

type StartBotAction = Action<{ id: ChatId, next: string }>;
type UpdateBotVarsAction = Action<{ id: ChatId, next: string }>;

export const actions = {
  startBot(id: ChatId, next: string): StartBotAction {
    return {
      type: START_BOT,
      payload: { id, next }
    }
  },
  updateBotVars(id: ChatId, vars: BotVars): UpdateBotVarsAction {
    return {
      type: UPDATE_BOT_VARS,
      payload: { id, vars }
    }
  }
}

export const reducer = createReducer({
  [START_BOT]: (state: BotState, { payload: { id, next } }: StartBotAction) => {
    return {
      ...state,
      [id]: { next }
    }
  },
  [UPDATE_BOT_VARS]: (state: BotState, { payload: { id, vars } }: StartBotAction) => {
    return {
      ...state,
      [id]: { ...state[id], ...vars }
    }
  }
})
