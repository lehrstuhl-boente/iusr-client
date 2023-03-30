interface NotificationStoreState {
  notification: Notification | null;
}

interface Notification {
  id: number;
  type: string;
  content: string;
}

export const useNotificationStore = defineStore('notification-store', {
  state: (): NotificationStoreState => {
    return {
      notification: null,
    };
  },
});
