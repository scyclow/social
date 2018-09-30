// @flow

import bot1 from './bot1'
import { type Dispatch, type GetState } from 'ducks'

const botMap = {
  bot1
}

export type BotState<P> = $Shape<{
  previous: ?string,
  ...P
}>;

type NextBotStateArgs = {
  botId: string,
  chatId: string,
  message: string,
  botState?: BotState<*>,
  dispatch: Dispatch,
  getState: GetState
};

type NextBotStateOutput = {
  response: ?string,
  wait?: number,
  followUps?: Array<{
    response: string,
    wait: number,
    newState?: BotState<*>
  }>,
  newState: BotState<*>
};

export function getNextBotState({
    botId,
    chatId,
    message,
    botState = {},
    dispatch,
    getState
  }: NextBotStateArgs
): NextBotStateOutput {
  const bot = botMap[botId];
  if (!bot) return { newState: botState, response: null }
  const { response, wait, newState, followUps } = bot(message, botState)

  return { response, wait, newState, followUps}
}
