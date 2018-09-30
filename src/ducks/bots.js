// @flow

import { type Action, type GetState, type Dispatch } from 'ducks'
import { createReducer } from 'utils/redux'
import { getNextBotState, type BotState } from 'bots'
import { type ChatId, actions as chatActions } from './chats'
import { actions as schedulerActions } from './scheduler'

export type BotsState = {
  [string | ChatId]: BotState<mixed>
};

const defaultState: BotsState = {}

const UPDATE_BOT_STATE = 'bots/UPDATE_BOT_STATE'

type UpdateBotStateAction = Action<{ id: ChatId, state: mixed }>;
// type MessageToBotAction = Action<{ }>;

export const actions = {
  updateBotState(id: ChatId, state: BotState<mixed>) {
    return {
      type: UPDATE_BOT_STATE,
      payload: { id, state }
    }
  },

  messageToBot(botId: string, chatId: ChatId, message: string) {
    return (dispatch: Dispatch, getState: GetState) => {
      const { bots } = getState()
      const { response, newState, followUps, wait } = getNextBotState({
        botId,
        chatId,
        message,
        dispatch,
        getState,
        botState: bots[botId] || {}
      })
      dispatch(actions.updateBotState(botId, newState))

      if (response) {
        dispatch(schedulerActions.schedule(
          chatActions.rawChatMessage(botId, chatId, response),
          wait || 400
        ))
      }

      if (followUps) {
        let accWait = 0;
        followUps.forEach(followUp => {
          accWait += (followUp.wait || 25)

          if (followUp.newState) {
            dispatch(schedulerActions.schedule(
              actions.updateBotState(botId, followUp.newState),
              accWait
            ))
          }

          if (followUp.response) {
            dispatch(schedulerActions.schedule(
              chatActions.rawChatMessage(botId, chatId, followUp.response),
              accWait
            ))
          }
        })
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
