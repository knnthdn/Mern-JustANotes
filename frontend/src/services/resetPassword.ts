export type ResetPasswordType = {
  email: string;
  newPassword: string;
  confirmPassword: string;
  resetCode: string;
};

async function resetPassword({
  email,
  newPassword,
  confirmPassword,
  resetCode,
}: ResetPasswordType) {
  const res = await fetch(`${import.meta.env.VITE_URL}/resetPassword`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email,
      password: newPassword,
      confirmPassword,
      code: resetCode,
    }),
  });

  return res.json();
}

export default resetPassword;
