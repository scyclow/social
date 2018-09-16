// @flow

import  {type BotState} from './index'
import { sample } from 'lodash'


const actions = {
  greeting(userMsg, botState) {
    return {
      response: `Hi! Welcome to the social network. What's your name?`,
      botState: {
        activeAction: 'name'
      }
    }
  },
  name(userMsg, botState) {
    const name = userMsg.replace(/.*name is/, '')
    return {
      response: `Hi ${name}! Let me know if you have any questions!`,
      botState: {
        name,
        activeAction: 'general'
      }
    }
  },
  general(userMsg, botState) {
    const response = sample([
      'Wow, that\'s really interesting.',
      'Hmm, I\'m going to have to think about that.',
      'Sorry, I\'m not sure I understand...',
    ])
    return {
      response,
      botState
    }
  }
}

export default (userMsg: string, botState: BotState) => {
  const activeAction = botState.activeAction || 'greeting'
  return actions[activeAction](userMsg, botState)
}

