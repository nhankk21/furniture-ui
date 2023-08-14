export function saveCache(key: string, value: any) {
  try {
    const data = {
      value,
    };
    localStorage.setItem(key, data.toString());
  } catch (error: any) {
    throw new Error(error);
  }
}
export function readCache(key: string, defaultValue?: any) {
  if (typeof window !== 'undefined') {
    if (
      localStorage &&
      Object.prototype.hasOwnProperty.call(localStorage, key)
    ) {
      const item = localStorage.getItem(key);
      if (item) {
        try {
          const itemUtf8 = item.toString();
          const data = JSON.parse(itemUtf8);
          if (data && data.value) {
            return data.value;
          }
        } catch (error) {
          // throw new Error(error);
        }
      }
    }
  }
  return defaultValue;
}

export function clearCache() {
  if (typeof window !== undefined) {
    let values = [];
    values = Object.keys(localStorage);
    values.forEach((element) => {
      if (!element.includes('react-use-cart')) {
        localStorage.removeItem(element);
      }
    });
  }
}
