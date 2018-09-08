// @flow
import React, { Component } from 'react';
import styles from './styles.module.css'
import { type ChatPopulated } from 'types/Chat'

type ChatBoxProps = {
  onClose: () => mixed,
  chat: ChatPopulated,
};

type ChatBoxState = {
  minimized: boolean
};

const ChatBoxHeader = ({ name, onClose, onMinimize }) => (
  <div className={styles.header} onClick={onMinimize}>
    <span>{name}</span>
    <span onClick={onClose}>X</span>
  </div>
)

const ChatBoxContent = ({ minimized, history }) => {
  if (minimized) {
    return <div></div>
  }
  return (
    <div className={styles.content}>
      {history.map(h => <div>{JSON.stringify(h)}</div>)}
    </div>
  )
}



export default class ChatBox extends Component<ChatBoxProps, ChatBoxState> {
  state = {
    minimized: false
  }

  onMinimize = () => this.setState(state => ({ ...state, minimized: !state.minimized }))

  render() {
    const { chat, onClose } = this.props
    const { minimized } = this.state
    return (
      <div className={styles.container}>
        <ChatBoxHeader name={chat.participant.name} onClose={onClose} onMinimize={this.onMinimize}/>
        <ChatBoxContent minimized={minimized} history={chat.history}/>
      </div>
    )
  }
}
