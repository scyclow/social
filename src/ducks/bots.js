// @flow

import { type ChatId } from 'types/Chat'
import { type Action, type GetState, type Dispatch } from 'types/redux'
import { createReducer } from 'utils/redux'
import { getNextBotState, type BotState } from 'bots'
import { actions as chatActions } from './chats'

export type BotsState = {
  [ChatId]: BotState
};

const defaultState: BotsState = {}

const UPDATE_BOT_STATE = 'bots/UPDATE_BOT_STATE'

type UpdateBotStateAction = Action<{ id: ChatId, state: Object }>;
type MessageToBotAction = Action<{ }>;

export const actions = {

  updateBotState(id: ChatId, state: BotState): UpdateBotStateAction {
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
        setTimeout(() => {
          dispatch(chatActions.newChatMessage(botId, chatId, response))
        } , 100)
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
