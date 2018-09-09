// @flow
import React, { Component } from 'react';
import styles from './styles.module.css'
import { type ChatPopulated } from 'types/Chat'

type ChatBoxProps = {
  onClose: () => mixed,
  sendMessage: (string) => mixed,
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

const ChatBoxContent = ({ history }) => (
  <div className={styles.content}>
    {history.map(h => <div>{JSON.stringify(h)}</div>)}
  </div>
)

class ChatBoxInput extends Component<*, *> {
  state = { value: '' }

  onChange = e => this.setState({ value: e.target.value })

  render() {
    return (
      <input className={styles.input} onKeyPress={e => e.key === 'Enter' && this.props.sendMessage(e.target.value)}/>
    )
  }
}


export default class ChatBox extends Component<ChatBoxProps, ChatBoxState> {
  state = {
    minimized: false
  }

  componentDidMount() {
    console.log('mount')
  }

  onMinimize = () => this.setState(state => ({ ...state, minimized: !state.minimized }))

  render() {
    const { chat, onClose, sendMessage } = this.props
    const { minimized } = this.state
    return (
      <div className={styles.container}>
        <ChatBoxHeader name={chat.participant.name} onClose={onClose} onMinimize={this.onMinimize}/>
        {!minimized && <ChatBoxContent history={chat.history}/>}
        {!minimized && <ChatBoxInput sendMessage={sendMessage} />}
      </div>
    )
  }
}
