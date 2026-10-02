import { useState } from 'react';
import styles from './MessageInput.module.css';
import useGreenApiClient from '@/api/useGreenApiClient';
import useChatStore from '@/store/useChatStore';
import type { Message } from '@/store/useMessageStore';
import useMessageStore from '@/store/useMessageStore';
import Button from '@/components/shared/Button';

export default function MessageInput() {
  const [msg, setMsg] = useState('');
  const activeChatId = useChatStore(state => state.activeChatId);
  const apiClient = useGreenApiClient();
  const addMessage = useMessageStore(state => state.addMessage);

  async function submitHandler(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!activeChatId) return;

    const result = await apiClient.sendMessage(activeChatId, msg);
    const message: Message = {
      id: result.idMessage,
      chatId: activeChatId,
      text: msg,
      timestamp: Date.now(),
      direction: 'outgoing'
    };
    addMessage(message);
    setMsg('');
  }

  return (
    <form className={styles.sendForm} onSubmit={submitHandler}>
      <input
        type="text"
        value={msg}
        className={styles.input}
        autoFocus={true}
        onChange={event => {
          setMsg(event.target.value);
        }}
      />
      <Button type="submit" className="send" aria-label="Отправить сообщение" disabled={!msg}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 19V5M12 5L5 12M12 5L19 12"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
    </form>
  );
}
