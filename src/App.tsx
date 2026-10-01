import { useEffect, useMemo } from 'react';
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

function App() {
  const { idInstance, apiTokenInstance } = useCredentialStore(state => state.credentials);
  const setCredentials = useCredentialStore(state => state.setCredentials);
  const openModal = useModalStore(state => state.openModal);
  const addChat = useChatStore(state => state.addChat);
  const setActiveChat = useChatStore(state => state.setActiveChat);
  const apiClient = useMemo(
    () => createGreenApiClient({ idInstance, apiTokenInstance }),
    [idInstance, apiTokenInstance]
  );

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
    if (!idInstance && !apiTokenInstance) {
      openModal('credentials');
    }
  }, []);

  async function receiveNotification() {
    const result = await apiClient.receiveNotification();
    if (result?.receiptId) {
      await apiClient.deleteNotification(result.receiptId);
    }
  }

  async function checkPhone() {
    const result = await apiClient.checkAccount();
    console.log(result);
  }

  async function sendMsg() {
    await apiClient.sendMessage('', 'Я использую GREEN-API для отправки этого сообщения!');
  }

  return (
    <div className={styles.app}>
      <Aside />
      <Content />
      <CredentialsModal onSubmit={handleCredentialsSubmit} />
      <AddPhoneModal onSubmit={handleAddPhoneSubmit} />
    </div>
  );

  // return (
  //   <>
  //     <button onClick={receiveNotification}>Check messages</button>
  //     <button onClick={checkPhone}>Check phone</button>
  //     <button onClick={sendMsg}>Send</button>
  //   </>
  // );
}

export default App;

// getWebhooksCount
//clearWebhooksQueue method delete
