import styles from '@/components/shared/Avatar.module.css';
import type { Chat } from '@/store/useChatStore';

type Props = {
  chat: Chat;
  size?: 'l' | 'm';
};

export default function Avatar({ chat, size = 'l' }: Props) {
  const sizeClass = styles[size];
  const gradientIndex =
    Array.from(chat.chatId).reduce((hash, character) => (hash * 31 + character.charCodeAt(0)) >>> 0, 0) % 5;
  const gradientClass = styles[`gradient${gradientIndex}`];

  return (
    <>
      {chat.avatar ? (
        <img className={`${styles.avatar} ${sizeClass}`} src={chat.avatar} alt="" />
      ) : (
        <span className={`${styles.avatarFallback} ${sizeClass} ${gradientClass}`}>
          {chat.title.slice(0, 1).toUpperCase()}
        </span>
      )}
    </>
  );
}
