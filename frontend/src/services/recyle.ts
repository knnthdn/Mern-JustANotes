async function recycleNotes(notes: []) {
  const res = await fetch(`${import.meta.env.VITE_URL}/recyclemany`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(notes),
    credentials: "include",
  });

  return res.json();
}

export default recycleNotes;
