import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type Credentials = {
  idInstance: string;
  apiTokenInstance: string;
};

type CredentialStore = {
  credentials: Credentials;
  setCredentials: (credentials: Credentials) => void;
  clearCredentials: () => void;
};

const useCredentialStore = create<CredentialStore>()(
  persist(
    set => ({
      credentials: { idInstance: '', apiTokenInstance: '' },
      setCredentials: credentials => set({ credentials }),
      clearCredentials: () => set({ credentials: { idInstance: '', apiTokenInstance: '' } })
    }),
    {
      name: 'green-api-credentials',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);

export default useCredentialStore;
