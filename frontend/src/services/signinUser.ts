export type SignType = {
  email: string;
  password: string;
  confirmPassword: string;
};

async function signUser({ email, password, confirmPassword }: SignType) {
  const res = await fetch(`${import.meta.env.VITE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ email, password, confirmPassword }),
    credentials: "include",
  });

  return res.json();
}

export default signUser;
