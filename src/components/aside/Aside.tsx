import styles from '@/components/aside/Aside.module.css';
import Button from '@/components/shared/Button';
import useCredentialStore from '@/store/useCredentialStore';
import useModalStore from '@/store/useModalStore';
import useChatStore from '@/store/useChatStore';
import ChatItem from '@/components/aside/ChatItem';

export default function Aside() {
  const { idInstance } = useCredentialStore(state => state.credentials);
  const clearCredentials = useCredentialStore(state => state.clearCredentials);
  const openModal = useModalStore(state => state.openModal);
  const chats = useChatStore(state => state.chats);
  const clearChats = useChatStore(state => state.clearChats);

  return (
    <aside className={styles.aside}>
      <header className={styles.header}>
        <h1>Чаты</h1>
        <Button
          type="button"
          className="add"
          aria-label="Начать общение"
          disabled={!idInstance}
          onClick={() => {
            openModal('addPhone');
          }}>
          +
        </Button>
      </header>
      <ul className={styles.chatList}>
        {chats.map(chat => (
          <ChatItem chat={chat} key={chat.chatId} />
        ))}
      </ul>
      <footer className={styles.footer}>
        {idInstance ? (
          <Button
            onClick={() => {
              clearCredentials();
              clearChats();
            }}>
            Удалить учетные данные
          </Button>
        ) : (
          <Button
            onClick={() => {
              openModal('credentials');
            }}>
            Ввести учетные данные
          </Button>
        )}
      </footer>
    </aside>
  );
}
