import { createSignal } from 'solid-js';

function getStorage(key: string, storage = localStorage) {
  const storedValue = storage.getItem(key);
  const initialValue = storedValue ? JSON.parse(storedValue) : null;

  return initialValue;
}

function setStorage(key: string, value: any, storage = localStorage) {
  const storedValue = storage.getItem(key);

  if (storedValue) {
    return;
  } else {
    storage.setItem(key, JSON.stringify(value));
  }
}

function deleteStorage(key: string, storage = localStorage) {
  storage.removeItem(key);
}

function getOrCreateStorage<T>(key: string, defaultValue: T, storage = localStorage) {
  const storedValue = storage.getItem(key);
  const initialValue = storedValue ? JSON.parse(storedValue) : defaultValue;

  const [value, setValue] = createSignal(initialValue);

  const setValueAndStore = (newValue: T) => {
    setValue(() => newValue);
    storage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setValueAndStore];
}

async function setAndDeleteStorage<T>(key: string, value: T, storage = localStorage) {
  const storedValue = storage.getItem(key);

  if (storedValue) {
    storage.removeItem(key);
    storage.setItem(key, JSON.stringify(value));
  } else {
    storage.setItem(key, JSON.stringify(value));
  }
}

export { getStorage, setStorage, deleteStorage, getOrCreateStorage, setAndDeleteStorage };