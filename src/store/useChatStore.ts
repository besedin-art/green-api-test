import { create } from 'zustand';
import type { GetContactInfoResponse } from '@/api/api';

export type Chat = Pick<GetContactInfoResponse, 'chatId' | 'phoneNumber' | 'avatar' | 'lastSeen'> & {
  title: string;
};

type Store = {
  activeChatId: Chat['chatId'] | null;
  chats: Chat[];
  addChat: (chat: Chat) => void;
  setActiveChat: (chat: Chat['chatId'] | null) => void;
  clearChats: () => void;
};

const initialState = {
  activeChatId: null,
  chats: []
};

const useChatStore = create<Store>(set => ({
  ...initialState,
  addChat: chat =>
    set(state =>
      state.chats.some(existingChat => existingChat.chatId === chat.chatId) ? state : { chats: [...state.chats, chat] }
    ),
  setActiveChat: chatId => set(() => ({ activeChatId: chatId })),
  clearChats: () => set(initialState)
}));

export function getActiveChat(state: Store): Chat | null {
  return state.chats.find(chat => chat.chatId === state.activeChatId) ?? null;
}

export default useChatStore;
