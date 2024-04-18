async function getUserEmail(email: string) {
  const res = await fetch(`${import.meta.env.VITE_URL}/forgotpassword`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ email }),
    credentials: "include",
  });

  return res.json();
}
export default getUserEmail;
