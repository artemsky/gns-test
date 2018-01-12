export default function debounce(func, wait, immediate) {
  let timeout;
  return function (...args) {  // eslint-disable-line
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) func.apply(this, args);
    }, wait);
    if (immediate && !timeout) func.apply(this, [...args]);
  };
}
