// Logic.js
export const isToday = (timestamp) => {
  if (!timestamp) return false;

  const d = new Date(timestamp);
  const today = new Date();

  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
};