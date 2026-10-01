import { create } from 'zustand';

type ModalType = null | 'credentials' | 'addPhone';

type Store = {
  modalType: ModalType;
  openModal: (modalType: ModalType) => void;
  closeModal: () => void;
};

const useModalStore = create<Store>(set => ({
  modalType: null,
  openModal: modalType => set({ modalType }),
  closeModal: () => set({ modalType: null })
}));

export default useModalStore;
