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

type Props = {
  chats: { [id: string]: ChatPopulated },
  newChatMessage: (string, string, string) => mixed
};
type State = { selected: ?ChatId };

class ChatModule extends Component<Props, State> {
  state = {
    selected: null
  }

  select = (selected: ChatId) => {
    this.setState({ selected })
  }

  render() {
    const { selected } = this.state
    const { chats, newChatMessage } = this.props

    return (
      <div className={styles.container}>
        {selected && (
          <ChatBox
            onClose={() => this.setState({ selected: null })}
            chat={chats[selected]}
            sendMessage={msg => newChatMessage('user0', selected, msg)}
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
