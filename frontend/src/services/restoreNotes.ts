async function restoreNotes(notes: [] | object) {
  const res = await fetch(`${import.meta.env.VITE_URL}/restorenotes`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(notes),
    credentials: "include",
  });

  return res.json();
}

export default restoreNotes;
