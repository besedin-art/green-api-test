import { useEffect } from 'react';
import styles from '@/App.module.css';
import Aside from '@/components/aside/Aside';
import Content from '@/components/content/Content';
import CredentialsModal from '@/components/modals/CredentialsModal';
import AddPhoneModal from '@/components/modals/AddPhoneModal';
import { createGreenApiClient } from '@/api/api';
import type { Credentials } from '@/store/useCredentialStore';
import useCredentialStore from '@/store/useCredentialStore';
import useModalStore from '@/store/useModalStore';
import useChatStore from '@/store/useChatStore';
import useGreenApiClient from '@/api/useGreenApiClient';

function App() {
  const { idInstance, apiTokenInstance } = useCredentialStore(state => state.credentials);
  const setCredentials = useCredentialStore(state => state.setCredentials);
  const openModal = useModalStore(state => state.openModal);
  const addChat = useChatStore(state => state.addChat);
  const setActiveChat = useChatStore(state => state.setActiveChat);
  const apiClient = useGreenApiClient();

  async function handleCredentialsSubmit(credentials: Credentials) {
    await createGreenApiClient(credentials).setSettings();
    setCredentials(credentials);
  }

  async function handleAddPhoneSubmit(phoneNumber: string) {
    const { exist, chatId } = await apiClient.checkAccount(phoneNumber);
    if (!exist) {
      throw new Error('Пользователь не найден');
    }
    const contact = await apiClient.getContactInfo(chatId);
    addChat({
      chatId: contact.chatId,
      phoneNumber: contact.phoneNumber,
      avatar: contact.avatar,
      lastSeen: contact.lastSeen,
      title: contact.name || contact.contactName || String(contact.phoneNumber)
    });
    setActiveChat(contact.chatId);
  }

  useEffect(() => {
    if (!idInstance || !apiTokenInstance) {
      openModal('credentials');
    }
  }, []);

  return (
    <div className={styles.app}>
      <Aside />
      <Content />
      <CredentialsModal onSubmit={handleCredentialsSubmit} />
      <AddPhoneModal onSubmit={handleAddPhoneSubmit} />
    </div>
  );
}

export default App;
