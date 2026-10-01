import { api } from '@/api/http';
import type { Credentials } from '@/store/useCredentialStore';

const apiUrl = 'https://3100.api.green-api.com';

type ChatId = string;
type ReceiveNotification = { receiptId: number } | null;
type CheckAccountResponse = {
  chatId: ChatId;
  exist: boolean;
  fromCache: boolean;
};
export type GetContactInfoResponse = {
  avatar: string;
  name: string;
  contactName: string;
  chatId: string;
  chatType: 'user';
  lastSeen: number;
  phoneNumber: number;
  phoneNumberTimestamp: number;
};
type SendMessageResponse = {
  idMessage: string;
};

export function createGreenApiClient(credentials: Credentials) {
  function buildUrl(action: string) {
    const { idInstance, apiTokenInstance } = credentials;

    if (!idInstance || !apiTokenInstance) {
      throw new Error('Сначала сохраните данные GREEN-API.');
    }

    return `${apiUrl}/waInstance${idInstance}/${action}/${apiTokenInstance}`;
  }

  function request<T>(action: string, init?: RequestInit) {
    return api<T>(buildUrl(action), init);
  }

  return {
    setSettings() {
      return request('setSettings', {
        method: 'POST',
        body: JSON.stringify({
          webhookUrl: '',
          outgoingWebhook: 'yes',
          stateWebhook: 'yes',
          incomingWebhook: 'yes'
        })
      });
    },

    checkAccount(phoneNumber: string) {
      return request<CheckAccountResponse>('checkAccount', {
        method: 'POST',
        body: JSON.stringify({ phoneNumber })
      });
    },

    getContactInfo(chatId: ChatId) {
      return request<GetContactInfoResponse>('getContactInfo', {
        method: 'POST',
        body: JSON.stringify({ chatId })
      });
    },

    receiveNotification(receiveTimeout = 5) {
      return request<ReceiveNotification>(`receiveNotification?receiveTimeout=${receiveTimeout}`);
    },

    deleteNotification(receiptId: number) {
      return request<void>(`deleteNotification/${receiptId}`, { method: 'DELETE' });
    },

    sendMessage(chatId: string, message: string) {
      return request<SendMessageResponse>('sendMessage', {
        method: 'POST',
        body: JSON.stringify({ chatId, message })
      });
    }
  };
}
