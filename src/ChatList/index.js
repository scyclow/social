// @flow

import React, { Component } from 'react';
import styles from './styles.module.css'

import { type ChatPopulated, type ChatId } from '../types/Chat'

type ChatListProps = {
  availableChats: Array<ChatPopulated>,
  onSelectChat: ChatId => mixed
};

type ChatListState = {
  loading: boolean,
  error: boolean,
  closed: boolean
};

const ChatListHeader = ({ updateClose, availableChats, closed }) => (
  <div className={styles.header} onClick={updateClose}>
    <span>Chat ({availableChats.length})</span>
    <span>{closed ? '+' : '-'}</span>
  </div>
)

const ChatListContent = ({ loading, error, closed, availableChats, onSelectChat }) => {
  if (closed) {
    return <div></div>
  }
  return (
    <div>
      {loading && 'loading data from server'}
      {error && 'something went wrong'}
      {!loading && !error && (
        <div className={styles.content}>
          {availableChats.map(chat => (
            <ChatListItem
              key={chat.id}
              chatId={chat.id}
              name={chat.participant.name}
              onlineNow={chat.participant.onlineNow}
              onSelect={onSelectChat}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const ChatListItem = ({ chatId, name, onlineNow, onSelect }) => (
  <div className={styles.item} onClick={() => onSelect(chatId)}>
    {name} -- {onlineNow ? 'online' : 'offline'}
  </div>
)


export default class ChatList extends Component<ChatListProps, ChatListState> {
  state = {
    loading: false,
    error: false,
    closed: true
  }

  updateClose = () => {
    this.setState(state => ({ ...state, closed: !state.closed }))
  }

  render() {
    const { loading, error, closed } = this.state;
    const { availableChats, onSelectChat } = this.props

    return (
      <div className={styles.container}>
        <ChatListHeader
          closed={closed}
          availableChats={availableChats}
          updateClose={this.updateClose}
        />
        <ChatListContent
          loading={loading}
          error={error}
          closed={closed}
          availableChats={availableChats}
          onSelectChat={onSelectChat}
        />
      </div>
    )
  }
}
