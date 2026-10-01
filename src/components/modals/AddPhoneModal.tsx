import { useState } from 'react';
import Modal from '@/components/modals/Modal';
import styles from '@/components/modals/ModalForms.module.css';
import Button from '@/components/shared/Button';
import useModalStore from '@/store/useModalStore';

type Props = {
  onSubmit: (phone: string) => Promise<void>;
};

export default function AddPhoneModal({ onSubmit }: Props) {
  const modalType = useModalStore(state => state.modalType);
  const closeModal = useModalStore(state => state.closeModal);
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    const normalizedPhone = phone.startsWith('8') ? `7${phone.slice(1)}` : phone;
    try {
      await onSubmit(normalizedPhone);
      closeModal();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Не удалось добавить чат.');
    }
  }

  if (modalType !== 'addPhone') return null;

  return (
    <Modal title="Добавить чат">
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.field}>
          Номер телефона
          <input
            className={styles.input}
            type="tel"
            name="phone"
            autoComplete="tel"
            value={phone}
            onChange={event => {
              setPhone(event.target.value);
            }}
            required
          />
        </label>
        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}
        <Button type="submit" disabled={!phone}>
          Добавить
        </Button>
      </form>
    </Modal>
  );
}
