import styles from '@/components/content/Content.module.css';
import MessageInput from '@/components/content/MessageInput';
import TopPanel from '@/components/content/TopPanel';
import useChatStore, { getActiveChat } from '@/store/useChatStore';
import History from '@/components/content/History';
import useChatPolling from '@/hooks/useChatPolling';

export default function Content() {
  const activeChat = useChatStore(getActiveChat);
  const activeChatId = useChatStore(state => state.activeChatId);

  useChatPolling(activeChatId);

  return (
    <main className={styles.background}>
      {activeChat !== null && (
        <div className={styles.content}>
          <TopPanel activeChat={activeChat} />

          <History />

          <footer className={styles.footer}>
            <MessageInput />
          </footer>
        </div>
      )}
    </main>
  );
}
