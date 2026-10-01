import { useEffect, type ReactNode } from 'react';
import styles from '@/components/modals/Modal.module.css';
import useModalStore from '@/store/useModalStore';

type ModalProps = {
  title: string;
  children: ReactNode;
};

export default function Modal({ title, children }: ModalProps) {
  const modalType = useModalStore(state => state.modalType);
  const closeModal = useModalStore(state => state.closeModal);
  useEffect(() => {
    if (!modalType) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') closeModal();
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [modalType, closeModal]);

  if (!modalType) return null;

  return (
    <div
      className={styles.backdrop}
      onMouseDown={event => {
        if (event.target === event.currentTarget) closeModal();
      }}>
      <section className={styles.modal} role="dialog" aria-modal="true" aria-label={title}>
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.closeButton} type="button" onClick={closeModal} aria-label="Закрыть">
            ×
          </button>
        </header>
        {children}
      </section>
    </div>
  );
}
