export const LocalStorage = {
  set<T>(key: string, value: T) {
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(key, jsonValue);
  },
  get<T>(key: string): T | null {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue) {
      return JSON.parse(jsonValue);
    }
    return null;
  },
};
