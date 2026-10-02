import { useMemo } from 'react';
import { createGreenApiClient } from '@/api/api';
import useCredentialStore from '@/store/useCredentialStore';

export default function useGreenApiClient() {
  const credentials = useCredentialStore(state => state.credentials);
  return useMemo(() => createGreenApiClient(credentials), [credentials]);
}
