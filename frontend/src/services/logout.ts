async function logout() {
  const res = await fetch(`${import.meta.env.VITE_URL}/logout`, {
    method: "GET",
    credentials: "include",
  });
  return res.json();
}

export default logout;
