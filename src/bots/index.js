// @flow

import bot1 from './bot1'

const botMap = {
  bot1
}

export type BotState = {
  previous: ?string,
  [string]: mixed
};

export function getNextBotState(botId: string, message: string, botState: BotState) {
  console.log(botId)
  const bot = botMap[botId];
  if (!bot) return { newState: botState }
  const {response, botState: newState} = bot(message, botState)

  return {response, newState}
}
