import type { Chat } from '@/store/useChatStore';
import styles from '@/components/aside/ChatItem.module.css';
import useChatStore from '@/store/useChatStore';
import Avatar from '@/components/shared/Avatar';

export default function ChatItem({ chat }: { chat: Chat }) {
  const activeChatId = useChatStore(state => state.activeChatId);
  const setActiveChat = useChatStore(state => state.setActiveChat);
  return (
    <li
      className={`${styles.chatItem} ${chat.chatId === activeChatId ? styles.active : ''}`}
      onClick={() => {
        setActiveChat(chat.chatId);
      }}>
      <Avatar chat={chat} size="l" />
      <span className={styles.chatDetails}>
        <strong>{chat.title}</strong>
        <span>+{chat.phoneNumber}</span>
      </span>
    </li>
  );
}
