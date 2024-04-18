export default async function login(email: string, password: string) {
  const res = await fetch(`${import.meta.env.VITE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });
  return res.json();
}
