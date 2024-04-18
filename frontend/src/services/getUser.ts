export default async function getUser() {
  const res = await fetch(import.meta.env.VITE_URL, {
    method: "GET",
    credentials: "include",
  });
  return await res.json();
}
