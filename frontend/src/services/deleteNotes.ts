async function deleteNotes(notes: [] | object) {
  const res = await fetch(`${import.meta.env.VITE_URL}/deletenotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(notes),
    credentials: "include",
  });
  return res.json();
}

export default deleteNotes;
