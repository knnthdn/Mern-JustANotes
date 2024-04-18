async function setNickname(nickname: string) {
  const res = await fetch(`${import.meta.env.VITE_URL}/setnickname`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ nickname }),
    credentials: "include",
  });

  return res.json();
}

export default setNickname;
