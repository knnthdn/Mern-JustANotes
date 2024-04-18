async function setNotesPref(_id: string | undefined, notesPreference: object) {
  const res = await fetch(`${import.meta.env.VITE_URL}/togglepreference`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id,
      notesPreference,
    }),
    credentials: "include",
  });

  return res.json();
}

export default setNotesPref;
