export type ChangePasswordTypes = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

async function changePassword({
  currentPassword,
  newPassword,
  confirmPassword,
}: ChangePasswordTypes) {
  const res = await fetch(`${import.meta.env.VITE_URL}/changePassword`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
    credentials: "include",
  });
  return res.json();
}

export default changePassword;
