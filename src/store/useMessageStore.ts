import { create } from 'zustand';

export type Message = {
  id: string;
  chatId: string;
  text: string;
  timestamp: number;
  direction: 'incoming' | 'outgoing';
};

type MessageStore = {
  messagesByChatId: Record<string, Message[]>;
  addMessage: (message: Message) => void;
};

const EMPTY_MESSAGES: Message[] = [];

const useMessageStore = create<MessageStore>(set => ({
  messagesByChatId: {},
  addMessage: message =>
    set(state => ({
      messagesByChatId: {
        ...state.messagesByChatId,
        [message.chatId]: [...(state.messagesByChatId[message.chatId] ?? []), message]
      }
    }))
}));

export function getMessagesByChatId(state: MessageStore, chatId: string | null): Message[] {
  if (!chatId) {
    return EMPTY_MESSAGES;
  }

  return state.messagesByChatId[chatId] ?? EMPTY_MESSAGES;
}

export default useMessageStore;
