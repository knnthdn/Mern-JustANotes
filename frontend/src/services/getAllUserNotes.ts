export default async function getAllUserNotes() {
  const res = await fetch(`${import.meta.env.VITE_URL}/mynotes`, {
    method: "GET",
    credentials: "include",
  });
  return await res.json();
}
