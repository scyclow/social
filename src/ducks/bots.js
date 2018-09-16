// @flow

import { type ChatId } from 'types/Chat'
import { type Action, type GetState, type Dispatch } from 'types/redux'
import { createReducer } from 'utils/redux'
import { getNextBotState, type BotState } from 'bots'
import { actions as chatActions } from './chats'
import { actions as schedulerActions } from './scheduler'

export type BotsState = {
  [ChatId]: BotState<mixed>
};

const defaultState: BotsState = {}

const UPDATE_BOT_STATE = 'bots/UPDATE_BOT_STATE'

type UpdateBotStateAction = Action<{ id: ChatId, state: Object }>;
// type MessageToBotAction = Action<{ }>;

export const actions = {
  updateBotState(id: ChatId, state: BotState<mixed>): UpdateBotStateAction {
    return {
      type: UPDATE_BOT_STATE,
      payload: { id, state }
    }
  },

  messageToBot(botId: string, chatId: ChatId, message: string) {
    return (dispatch: Dispatch, getState: GetState) => {
      const { bots } = getState()
      const botState = bots[botId]
      const {response, newState} = getNextBotState(botId, message, botState || {})
      dispatch(actions.updateBotState(botId, newState))

      if (response) {
        dispatch(schedulerActions.schedule(
          chatActions.rawChatMessage(botId, chatId, response),
          400
        ))
      }
    }
  }
}

export const reducer = createReducer({
  [UPDATE_BOT_STATE]: (state: BotsState, { payload }: UpdateBotStateAction) => {
    return {
      ...state,
      [payload.id]: { ...state[payload.id], ...payload.state }
    }
  }
}, defaultState)
