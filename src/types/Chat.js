// @flow

import { type User, type UserId, type Users } from './User'
import { omit } from 'lodash'

export opaque type ChatId: string = string;

export type ChatMessage = {
  sender: UserId,
  time: Date,
  message: string
};

export type Chat = {
  id: ChatId,
  botId: UserId,
  open: boolean,
  minimized: boolean,
  history: Array<ChatMessage>
};

export type Chats = {
  [ChatId]: Chat
};

export type ChatPopulated = {
  id: ChatId,
  open: boolean,
  minimized: boolean,
  history: Array<ChatMessage>,
  bot: User
};

export function populateChat(chat: Chat, users: Users): ChatPopulated {
  const bot = users[chat.botId]
  return { ...omit(chat, 'botId'), bot }
}

export const createChatId = (id: string): ChatId => id
