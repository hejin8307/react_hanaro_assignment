export const setStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getStorage = <T>(key: string): T | null => {
  const getData = localStorage.getItem(key);
  if (getData) {
    return JSON.parse(getData);
  }
  return null;
};

export const removeStorage = (key: string) => {
  localStorage.removeItem(key);
};
