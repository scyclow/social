// @flow

import bot1 from './bot1'

const botMap = {
  bot1
}

export type BotState<P> = $Shape<{
  previous: ?string,
  ...P
}>;

export function getNextBotState(botId: string, message: string, botState: BotState<*>) {
  const bot = botMap[botId];
  if (!bot) return { newState: botState, response: null }
  const {response, botState: newState} = bot(message, botState)

  return {response, newState}
}
