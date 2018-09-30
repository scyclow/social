// @flow

import React, { Component } from 'react';
import cx from 'utils/cx'
import styles from './styles.module.css'

import { type ChatId, type Chat } from 'ducks/chats'
import { type Users } from 'ducks/users'


type ChatListProps = {
  users: Users,
  availableChats: Array<Chat>,
  onSelectChat: ChatId => mixed,
  minimized: boolean,
  onMinimize: () => mixed
};

const ChatListHeader = ({ onMinimize, availableChats, minimized }) => (
  <div className={styles.header} onClick={onMinimize}>
    <span>Chat ({availableChats.length})</span>
    <span>{minimized ? '+' : '-'}</span>
  </div>
)

const ChatListContent = ({ minimized, availableChats, onSelectChat, users }) => {
  return (
    <div className={cx(styles.list, minimized && styles.minimized)}>
      <div className={styles.content}>
        {availableChats.map(chat => (
          <ChatListItem
            key={chat.id}
            chatId={chat.id}
            name={users[chat.botId].name}
            onlineNow={users[chat.botId].onlineNow}
            onSelect={onSelectChat}
          />
        ))}
      </div>
    </div>
  )
}

const ChatListItem = ({ chatId, name, onlineNow, onSelect }) => (
  <div className={styles.item} onClick={() => onSelect(chatId)}>
    {name} -- {onlineNow ? 'online' : 'offline'}
  </div>
)


export default class ChatList extends Component<ChatListProps, *> {
  render() {
    const { minimized, availableChats, onSelectChat, onMinimize, users } = this.props

    return (
      <div className={styles.container}>
        <ChatListHeader
          minimized={minimized}
          availableChats={availableChats}
          onMinimize={onMinimize}
        />
        <ChatListContent
          minimized={minimized}
          availableChats={availableChats}
          onSelectChat={onSelectChat}
          users={users}
        />
      </div>
    )
  }
}
