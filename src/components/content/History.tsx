import { useEffect, useRef } from 'react';
import styles from './History.module.css';
import useChatStore from '@/store/useChatStore';
import useMessageStore, { getMessagesByChatId } from '@/store/useMessageStore';
import type { Message } from '@/store/useMessageStore';

export default function History() {
  const activeChatId = useChatStore(state => state.activeChatId);
  const messages = useMessageStore(state => getMessagesByChatId(state, activeChatId));
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className={styles.history}>
      <div ref={containerRef} className={styles.messages}>
        {messages.map((message: Message) => {
          return (
            <div className={`${styles.message} ${styles[message.direction]}`} key={message.id}>
              {message.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}
