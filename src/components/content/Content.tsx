import styles from '@/components/content/Content.module.css';
import TopPanel from '@/components/content/TopPanel';
import useChatStore, { getActiveChat } from '@/store/useChatStore';

export default function Content() {
  const activeChat = useChatStore(getActiveChat);

  return (
    <main className={styles.background}>
      <div className={styles.content}>{activeChat !== null && <TopPanel activeChat={activeChat} />}</div>
    </main>
  );
}
