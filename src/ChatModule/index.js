// @flow

import React, { Component } from 'react';
import ChatList from '../ChatList'
import ChatBox from '../ChatBox'
import styles from './styles.module.css'
import { createUserId } from 'types/User'
import { type ChatId, type ChatPopulated, createChatId, populateChat } from 'types/Chat'
import { connect } from 'react-redux';
import { mapValues, values } from 'lodash'
import { actions as chatActions } from 'ducks/chats'



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

type Props = {
  chats: { [id: string]: ChatPopulated },
  newChatMessage: (string, string) => mixed
};
type State = { selected: ?ChatPopulated };

class ChatModule extends Component<Props, State> {
  state = {
    selected: null
  }

  select = (id: ChatId) => {
    const selected = this.props.chats[id];
    this.setState({ selected })
  }

  render() {
    const { selected } = this.state
    const { chats, newChatMessage } = this.props
    console.log(selected)
    return (
      <div className={styles.container}>
        {selected && (
          <ChatBox
            onClose={() => this.setState({ selected: null })}
            chat={selected}
            sendMessage={msg => newChatMessage(selected.participant.id, selected.id, msg)}
          />
        )}
        <ChatList
          onSelectChat={this.select}
          availableChats={values(chats)}
        />
      </div>
    )
  }
}

export default connect(
  state => ({
    chats: mapValues(state.chats, chat => populateChat(chat, state.users))
  }),
  {
    newChatMessage: chatActions.newChatMessage
  }
)(ChatModule)
