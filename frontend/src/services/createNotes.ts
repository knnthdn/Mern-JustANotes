async function createNotes(
  title: string,
  content: string,
  theme: object,
  fontSize: string
) {
  const res = await fetch(`${import.meta.env.VITE_URL}/newnotes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content,
      notesPreference: { theme, fontSize },
    }),
    credentials: "include",
  });

  return res.json();
}

export default createNotes;
