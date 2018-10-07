// @flow
import React, { Component } from 'react';
import styles from './styles.module.css'
import { type Chat } from 'ducks/chats'
import { type User } from 'ducks/users'
import ParsedText from 'components/ParsedText'

type ChatBoxProps = {
  onClose: () => mixed,
  sendMessage: (string) => mixed,
  chat: Chat,
  user: User,
  messageDraft: string,
  minimized: boolean,
  onMinimize: boolean => mixed,
  updateMessageDraft: (string, string) => mixed
};

const ChatBoxHeader = ({ name, onClose, onMinimize }) => (
  <div className={styles.header}>
    <span className={styles.headerName} onClick={onMinimize}>{name}</span>
    <span onClick={onClose}>X</span>
  </div>
)

const ChatBoxContent = ({ history }) => (
  <div className={styles.content}>
    {history.map((item, i) => (
      <div key={i}>
        <div className={styles.message}>
          <strong>{item.sender}:</strong> <ParsedText content={item.message} />
        </div>
      </div>
    ))}
  </div>
)

class ChatBoxInput extends Component<*, *> {
  onChange = e => this.props.updateMessageDraft(e.target.value)
  onEnter = e => {
    const { messageDraft, updateMessageDraft, sendMessage } = this.props
    if (e.key === 'Enter' && !!messageDraft) {
      sendMessage(messageDraft)
      updateMessageDraft('')
    }
  }

  render() {
    return (
      <input
        className={styles.input}
        onChange={this.onChange}
        onKeyPress={this.onEnter}
        value={this.props.messageDraft}
        placeholder="Press Enter to Send"
      />
    )
  }
}


export default class ChatBox extends Component<ChatBoxProps> {

  componentDidMount() {
    this.updateScroll()
  }

  componentDidUpdate() {
    this.updateScroll()
  }

  updateScroll() {
    setTimeout(() => {
      const $el = document.getElementsByClassName(styles.content)[0]
      if ($el) $el.scrollTop = $el.scrollHeight;
    }, 5)
  }

  sendMessage = (msg: string) => {
    this.props.sendMessage(msg)
  }

  render() {
    const {
      user,
      chat,
      minimized,
      onClose,
      onMinimize,
      sendMessage,
      updateMessageDraft,
      messageDraft
    } = this.props
    return (
      <div className={styles.container}>
        <ChatBoxHeader
          name={user.name}
          onClose={onClose}
          onMinimize={() => onMinimize(!minimized)}
        />
        {!minimized && <ChatBoxContent history={chat.history} />}
        {!minimized && (
          <ChatBoxInput
            sendMessage={sendMessage}
            messageDraft={messageDraft}
            updateMessageDraft={msg => updateMessageDraft(chat.id, msg)}
          />
        )}
      </div>
    )
  }
}
