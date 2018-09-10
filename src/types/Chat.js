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
  participantId: UserId,
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
  participant: User
};

export function populateChat(chat: Chat, users: Users): ChatPopulated {
  const participant = users[chat.participantId]
  return { ...omit(chat, 'participantId'), participant }
}

export const createChatId = (id: string): ChatId => id
