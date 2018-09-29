// @flow

import React, { Component } from 'react';
import ChatList from './ChatList'
import ChatBox from './ChatBox'
import styles from './styles.module.css'
import { type ChatPopulated, populateChat } from 'types/Chat'
import { connect } from 'react-redux';
import { mapValues, filter, values } from 'lodash'
import { actions as chatActions } from 'ducks/chats'
import { actions as chatModuleActions } from './duck'

type Props = {
  chats: { [id: string]: ChatPopulated },
  chatStates: {
    [id: string]: {
      windowState: 'open' | 'minimized' | 'closed',
      messageDraft: string
    }
  },
  listMinimized: boolean,
  newChatMessage: typeof chatActions.newChatMessage,
  minimizeChatList: typeof chatModuleActions.minimizeChatList,
  openChatBox: typeof chatModuleActions.openChatBox,
  closeChatBox: typeof chatModuleActions.closeChatBox,
  minimizeChatBox: typeof chatModuleActions.minimizeChatBox,
  updateMessageDraft: typeof chatModuleActions.updateMessageDraft
};

class Chat extends Component<Props, *> {
  render() {
    const {
      chats,
      chatStates,
      listMinimized,
      newChatMessage,
      closeChatBox,
      openChatBox,
      minimizeChatBox,
      minimizeChatList,
      updateMessageDraft
    } = this.props
    const openChats = filter(chats, chat => chatStates[chat.id].windowState === 'open' || chatStates[chat.id].windowState === 'minimized')

    return (
      <div className={styles.container}>
        {openChats.map(chat => (
          <ChatBox
            key={chat.id}
            onClose={() => closeChatBox(chat.id)}
            onMinimize={(minimized) => minimizeChatBox(chat.id, minimized)}
            minimized={chatStates[chat.id].windowState === 'minimized'}
            messageDraft={chatStates[chat.id].messageDraft}
            chat={chat}
            sendMessage={msg => newChatMessage('user0', chat.id, msg)}
            updateMessageDraft={updateMessageDraft}
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
    chatStates: state.chatModule.chats,
    listMinimized: state.chatModule.listMinimized,
  }),
  {
    newChatMessage: chatActions.newChatMessage,
    openChatBox: chatModuleActions.openChatBox,
    closeChatBox: chatModuleActions.closeChatBox,
    minimizeChatBox: chatModuleActions.minimizeChatBox,
    minimizeChatList: chatModuleActions.minimizeChatList,
    updateMessageDraft: chatModuleActions.updateMessageDraft,
  }
)(Chat)
