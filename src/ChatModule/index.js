// @flow

import React, { Component } from 'react';
import ChatList from '../ChatList'
import ChatBox from '../ChatBox'
import styles from './styles.module.css'
import { type UserId, createUserId } from '../types/User'
import { type ChatId, createChatId } from '../types/Chat'


const chatMockData = [
  {
    id: createChatId('chat1'),
    history: [],
    participant: {
      id: createUserId('user1'),
      name: 'steve',
      onlineNow: true
    }
  },
  {
    id: createChatId('chat2'),
    history: [],
    participant: {
      id: createUserId('user2'),
      name: 'tom',
      onlineNow: false
    }
  },
  {
    id: createChatId('chat3'),
    history: [],
    participant: {
      id: createUserId('user3'),
      name: 'max',
      onlineNow: false
    }
  },
  {
    id: createChatId('chat4'),
    history: [],
    participant: {
      id: createUserId('user4'),
      name: 'bil',
      onlineNow: false
    }
  },
  {
    id: createChatId('chat5'),
    history: [],
    participant: {
      id: createUserId('user5'),
      name: 'elon',
      onlineNow: true
    }
  },
  {
    id: createChatId('chat6'),
    history: [],
    participant: {
      id: createUserId('user6'),
      name: 'peter',
      onlineNow: true
    }
  },
]

type Props = {};
type State = { selected: ?ChatId };

export default class ChatModule extends Component<Props, State> {
  state = {
    selected: null
  }
  render() {
    return (
      <div className={styles.container}>
        {this.state.selected && (
          <ChatBox
            onClose={() => this.setState({ selected: null })}
            chat={chatMockData.find(d => d.id === this.state.selected)}
          />
        )}
        <ChatList
          onSelectChat={selected => this.setState({ selected })}
          availableChats={chatMockData}
        />
      </div>
    )
  }
}
