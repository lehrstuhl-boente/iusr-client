// we don't use the store in the components directly to take advantage of the nuxt auto imports
export const useNotification = (type: string, content: string) => {
  const notificationStore = useNotificationStore();
  notificationStore.notification = {
    id: Date.now(),
    type,
    content,
  };
};
