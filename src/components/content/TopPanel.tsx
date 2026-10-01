import { useEffect, useState } from 'react';
import styles from '@/components/content/TopPanel.module.css';
import Avatar from '@/components/shared/Avatar';
import BackButton from '@/components/shared/BackButton';
import type { Chat } from '@/store/useChatStore';
import useChatStore from '@/store/useChatStore';
import { formatLastSeen } from '@/utils/formatLastSeen';

export default function TopPanel({ activeChat }: { activeChat: Chat }) {
  const setActiveChat = useChatStore(state => state.setActiveChat);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(Date.now()), 10_000);
    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.topPanel}>
      <BackButton
        onClick={() => {
          setActiveChat(null);
        }}
      />
      <Avatar chat={activeChat} size="m" />
      <div className={styles.contact}>
        <strong>{activeChat.title}</strong>
        <div className={styles.lastSeen}>{formatLastSeen(activeChat.lastSeen, now)}</div>
      </div>
    </div>
  );
}
