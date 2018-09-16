// @flow
import React, { Component } from 'react';
import styles from './styles.module.css'
import { type ChatPopulated } from 'types/Chat'

type ChatBoxProps = {
  onClose: () => mixed,
  sendMessage: (string) => mixed,
  chat: ChatPopulated,
  onMinimize: boolean => mixed
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
        <div>{item.sender}: {item.message}</div>
      </div>
    ))}
  </div>
)

class ChatBoxInput extends Component<*, *> {
  state = { value: '' }

  onChange = e => this.setState({ value: e.target.value })
  onEnter = e => {
    if (e.key === 'Enter') {
      this.props.sendMessage(this.state.value)
      this.setState({ value: '' })
    }
  }

  render() {
    return (
      <input className={styles.input} onChange={this.onChange} value={this.state.value} onKeyPress={this.onEnter}/>
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
    const { chat, onClose, onMinimize, sendMessage } = this.props
    return (
      <div className={styles.container}>
        <ChatBoxHeader
          name={chat.bot.name}
          onClose={onClose}
          onMinimize={() => onMinimize(!chat.minimized)}
        />
        {!chat.minimized && <ChatBoxContent history={chat.history} />}
        {!chat.minimized && <ChatBoxInput sendMessage={sendMessage} />}
      </div>
    )
  }
}
