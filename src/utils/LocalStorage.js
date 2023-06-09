const getLocalStorage = (key, storage = localStorage) => {
    const value = storage.getItem(key);
    const initialValue = value ? JSON.parse(value) : null;

    return initialValue;
}

const setLocalStorage = (key, value, storage = localStorage) => {
    const isKeyExists = storage.getItem(key);

    if (isKeyExists) {
        return;
    } else {
        storage.setItem(key, JSON.stringify(value));
    }
}

const deleteLocalStorage = (key, storage = localStorage) => {
    const isKeyExists = storage.getItem(key);

    if (isKeyExists) {
        storage.removeItem(key);
    } else {
        return;
    }
}

export {
    getLocalStorage,
    setLocalStorage,
    deleteLocalStorage
}