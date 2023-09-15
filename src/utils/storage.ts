const storage = window.localStorage;

export const StorageUtil = {
  set(name: string, value: any) {
    storage.setItem(name, JSON.stringify(value));
  },

  get(name: string) {
    const storageItemValue: any = storage.getItem(name);
    try {
      return JSON.parse(storageItemValue);
    } catch (error) {
      return storageItemValue;
    }
  },
};
