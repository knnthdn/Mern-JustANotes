async function updateNotes(
  title: string,
  content: string,
  notesId: string | undefined
) {
  const res = await fetch(`${import.meta.env.VITE_URL}/editnotes/${notesId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content }),
    credentials: "include",
  });

  return res.json();
}

export default updateNotes;
