// @flow

import  {type BotState} from './index'
import { sample } from 'lodash'

const actions = {
  pause(_, newState) {
    return { newState }
  },
  greeting(userMsg, botState) {
    return {
      response: `Hi! Welcome to the social network. Do you need some help getting started?`,
      wait: 1000,
      newState: {
        activeAction: 'gettingStarted'
      }
    }
  },
  gettingStarted(userMsg, botState) {
    return {
      response: 'That\'s great to hear! I think you\'re going to have a lot of fun connecting with other people here :)',
      newState: {
        activeAction: 'pause'
      },
      followUps: [{
        response: 'I\'m going to set up your account, but first I need some information about you. ',
        wait: 1000
      }, {
        response: 'What is your name?',
        wait: 400,
        newState: {
          activeAction: 'name'
        }
      }]
    }
  },
  name(userMsg, botState) {
    const name = userMsg.replace(/.*name is/, '')
    return {
      response: `Great ${name}, I just need a little more information, and then you can get started!`,
      newState: {
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
      newState: botState
    }
  }
}

type User1State = BotState<{
  activeAction: $Keys<typeof actions>,
  name: string
}>;

export default (userMsg: string, botState: User1State) => {
  const activeAction = botState.activeAction || 'greeting'
  return actions[activeAction](userMsg, botState)
}

