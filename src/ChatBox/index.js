// @flow
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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

const ChatBoxContent = ({ history, getRef }) => (
  <div className={styles.content} ref={getRef}>
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


export default class ChatBox extends Component<ChatBoxProps, ChatBoxState> {
  state = {
    minimized: false
  }

  historyRef: any;

  componentDidMount() {
    console.log('mount')
  }

  onMinimize = () => this.setState(state => ({ ...state, minimized: !state.minimized }))

  sendMessage = (msg: string) => {
    this.props.sendMessage(msg)
    const historyRef: any = ReactDOM.findDOMNode(this.historyRef);
    historyRef.scrollTop = historyRef.scrollHeight;
  }

  render() {
    const { chat, onClose, sendMessage } = this.props
    const { minimized } = this.state
    return (
      <div className={styles.container}>
        <ChatBoxHeader name={chat.participant.name} onClose={onClose} onMinimize={this.onMinimize}/>
        {!minimized && <ChatBoxContent history={chat.history} getRef={el => this.historyRef }/>}
        {!minimized && <ChatBoxInput sendMessage={sendMessage} />}
      </div>
    )
  }
}
