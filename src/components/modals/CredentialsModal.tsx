import { useState } from 'react';
import Modal from '@/components/modals/Modal';
import styles from '@/components/modals/ModalForms.module.css';
import Button from '@/components/shared/Button';
import useModalStore from '@/store/useModalStore';
import type { Credentials } from '@/store/useCredentialStore';

type Props = {
  onSubmit: (credentials: Credentials) => void | Promise<void>;
};

export default function CredentialsModal({ onSubmit }: Props) {
  const modalType = useModalStore(state => state.modalType);
  const closeModal = useModalStore(state => state.closeModal);
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      await onSubmit({ idInstance, apiTokenInstance });
      closeModal();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Не удалось сохранить данные.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (modalType !== 'credentials') return null;

  return (
    <Modal title="Данные GREEN-API">
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.field}>
          Уникальный номер инстанса
          <input
            className={styles.input}
            type="text"
            name="idInstance"
            value={idInstance}
            onChange={event => setIdInstance(event.target.value)}
            required
          />
        </label>
        <label className={styles.field}>
          Ключ доступа инстанса
          <input
            className={styles.input}
            type="password"
            name="apiTokenInstance"
            value={apiTokenInstance}
            onChange={event => setApiTokenInstance(event.target.value)}
            required
          />
        </label>
        {submitError && (
          <p className={styles.error} role="alert">
            {submitError}
          </p>
        )}
        <Button type="submit" disabled={isSubmitting || !idInstance || !apiTokenInstance}>
          {isSubmitting ? 'Сохранение...' : 'Сохранить'}
        </Button>
      </form>
    </Modal>
  );
}
