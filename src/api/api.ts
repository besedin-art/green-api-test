import { api } from '@/api/http';
import type { Credentials } from '@/store/useCredentialStore';

const apiUrl = 'https://3100.api.green-api.com';

export type GreenApiNotification = {
  receiptId: number;
  body?: {
    typeWebhook?: string;
    idMessage?: string;
    timestamp?: number;
    senderData?: {
      chatId?: string;
      chatName?: string;
      senderName?: string;
    };
    messageData?: {
      typeMessage?: string;
      textMessageData?: {
        textMessage?: string;
      };
    };
  };
} | null;

type CheckAccountResponse = {
  chatId: string;
  exist: boolean;
  fromCache: boolean;
};
export type GetContactInfoResponse = {
  avatar: string;
  name: string;
  contactName: string;
  chatId: string;
  chatType: 'user' | 'group';
  lastSeen: number;
  phoneNumber: number;
  phoneNumberTimestamp: number;
};
type SendMessageResponse = {
  idMessage: string;
};

export function createGreenApiClient(credentials: Credentials) {
  function buildUrl(action: string | string[]) {
    const { idInstance, apiTokenInstance } = credentials;

    if (!idInstance || !apiTokenInstance) {
      throw new Error('Сначала сохраните данные GREEN-API.');
    }
    if (typeof action === 'string') {
      return `${apiUrl}/waInstance${idInstance}/${action}/${apiTokenInstance}`;
    } else {
      return `${apiUrl}/waInstance${idInstance}/${action[0]}/${apiTokenInstance}${action[1]}`;
    }
  }

  function request<T>(action: string | string[], init?: RequestInit) {
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

    getContactInfo(chatId: string) {
      return request<GetContactInfoResponse>('getContactInfo', {
        method: 'POST',
        body: JSON.stringify({ chatId })
      });
    },

    receiveNotification(receiveTimeout = 5) {
      return request<GreenApiNotification>(['receiveNotification', `?receiveTimeout=${receiveTimeout}`]);
    },

    deleteNotification(receiptId: number) {
      return request<void>(['deleteNotification', `/${receiptId}`], { method: 'DELETE' });
    },

    clearMessagesQueue() {
      return request<void>('clearMessagesQueue');
    },

    sendMessage(chatId: string, message: string) {
      return request<SendMessageResponse>('sendMessage', {
        method: 'POST',
        body: JSON.stringify({ chatId, message })
      });
    }
  };
}
