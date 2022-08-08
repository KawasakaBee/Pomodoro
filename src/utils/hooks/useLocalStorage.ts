type SetStorage = object | object[];

export function useLocalStorage(name: string, method: string, setStorage: SetStorage) {
  if (method === 'get') {
    const storage = localStorage.getItem(name);
    if (storage === null) {
      return reWrite(name, setStorage);
    }

    if (storage !== null) return JSON.parse(storage);
  } else if (method === 'set') {
    return reWrite(name, setStorage);
  }
}

function reWrite(name: string, setStorage: SetStorage) {
  localStorage.setItem(name, JSON.stringify(setStorage));
  const newStorage = localStorage.getItem(name);
  if (newStorage !== null) return JSON.parse(newStorage);
}
