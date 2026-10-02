import { useEffect } from 'react';
import useGreenApiClient from '@/api/useGreenApiClient';
import useMessageStore from '@/store/useMessageStore';

export default function useChatPolling(activeChatId: string | null) {
  const apiClient = useGreenApiClient();
  const addMessage = useMessageStore(state => state.addMessage);

  useEffect(() => {
    if (!activeChatId) {
      return;
    }

    let timeoutId: number | undefined;
    let isMounted = true;

    const pollNotifications = async () => {
      try {
        const notification = await apiClient.receiveNotification();

        if (!notification) {
          return;
        }

        if (notification.receiptId) {
          await apiClient.deleteNotification(notification.receiptId);
        }

        const body = notification.body;
        if (!body || body.typeWebhook !== 'incomingMessageReceived') {
          return;
        }

        const chatId = body.senderData?.chatId;
        const text =
          body.messageData?.typeMessage === 'textMessage' ? body.messageData.textMessageData?.textMessage : '';

        if (!chatId || !text || chatId !== activeChatId || !body.idMessage) {
          return;
        }

        if (!isMounted) {
          return;
        }

        addMessage({
          id: body.idMessage,
          chatId,
          text,
          timestamp: (body.timestamp ?? Date.now() / 1000) * 1000,
          direction: 'incoming'
        });
      } catch (error) {
        console.error('Failed to receive notification:', error);
      } finally {
        if (isMounted) {
          timeoutId = window.setTimeout(() => {
            void pollNotifications();
          }, 1000);
        }
      }
    };

    void pollNotifications();

    return () => {
      isMounted = false;
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [activeChatId, apiClient, addMessage]);
}
