export function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-Us", {
    weekday: "short",
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
}
