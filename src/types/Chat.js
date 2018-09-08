// @flow

import { type User, type UserId, type Users } from './User'

export opaque type ChatId: string = string;

export type Chat = {
  id: ChatId,
  participantId: UserId,
  history: Array<ChatMessage>
};

export type ChatMessage = {
  sender: UserId,
  time: Date,
  message: string
};

export type Chats = {
  [ChatId]: Chat
};

export type ChatPopulated = {
  id: ChatId,
  history: Array<ChatMessage>,
  participant: User
};

export function populateChat(chat: Chat, users: Users): ChatPopulated {
  const { id, history } = chat
  const participant = users[chat.participantId]
  return { id, history, participant }
}

export const createChatId = (id: string): ChatId => id
