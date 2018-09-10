// @flow

import React, { Component } from 'react';
import ChatList from '../ChatList'
import ChatBox from '../ChatBox'
import styles from './styles.module.css'
import { type ChatId, type ChatPopulated, populateChat } from 'types/Chat'
import { connect } from 'react-redux';
import { mapValues, filter, values } from 'lodash'
import { actions as chatActions } from 'ducks/chats'
import { actions as chatModuleActions } from './duck'

type Props = {
  chats: { [id: string]: ChatPopulated },
  newChatMessage: (string, string, string) => mixed,
  listMinimized: boolean,
  minimizeChatList: () => mixed,
  openChatBox: ChatId => mixed,
  closeChatBox: ChatId => mixed,
  minimizeChatBox: (ChatId, boolean) => mixed,
};

class ChatModule extends Component<Props, *> {
  render() {
    const {
      chats,
      listMinimized,
      newChatMessage,
      closeChatBox,
      openChatBox,
      minimizeChatBox,
      minimizeChatList
    } = this.props
    const openChats = filter(chats, chat => chat.open)

    return (
      <div className={styles.container}>
        {openChats.map(chat => (
          <ChatBox
            key={chat.id}
            onClose={() => closeChatBox(chat.id)}
            onMinimize={(minimized) => minimizeChatBox(chat.id, minimized)}
            chat={chat}
            sendMessage={msg => newChatMessage('user0', chat.id, msg)}
          />
        ))}
        <ChatList
          onSelectChat={openChatBox}
          onMinimize={minimizeChatList}
          minimized={listMinimized}
          availableChats={values(chats)}
        />
      </div>
    )
  }
}

export default connect(
  state => ({
    chats: mapValues(state.chats, chat => populateChat(chat, state.users)),
    listMinimized: state.chatModule.listMinimized,
  }),
  {
    newChatMessage: chatActions.newChatMessage,
    openChatBox: chatActions.openChatBox,
    closeChatBox: chatActions.closeChatBox,
    minimizeChatBox: chatActions.minimizeChatBox,
    minimizeChatList: chatModuleActions.minimizeChatList,
  }
)(ChatModule)
