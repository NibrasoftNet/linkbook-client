import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface NotificationTokenStore {
  token: string | null;
  setToken: (token: string | null) => void;
}

const useNotificationTokenStore = create<NotificationTokenStore>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        setToken: (token) => set({ token }),
      }),
      { name: 'notificationStore' },
    ),
  ),
);

export default useNotificationTokenStore;
