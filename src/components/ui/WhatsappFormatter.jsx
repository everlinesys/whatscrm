export const formatWhatsAppTime = (date) => {
  if (!date) return "";

  const d = new Date(date);
  const now = new Date();

  const isToday = d.toDateString() === now.toDateString();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  const isYesterday =
    d.toDateString() === yesterday.toDateString();

  if (isToday) {
    return d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (isYesterday) return "Yesterday";

  return d.toLocaleDateString();
};
