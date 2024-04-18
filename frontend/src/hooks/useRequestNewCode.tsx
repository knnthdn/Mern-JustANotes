import getUserEmail from "@/services/getUserEmail";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function useRequestNewCode(isNewCode: boolean) {
  const navigate = useNavigate();
  const {
    mutate,
    data: forgotPassRes,
    isPending,
  } = useMutation({
    mutationFn: getUserEmail,
    onSuccess: (data) => {
      if (data.status === "success") {
        if (!isNewCode) {
          navigate("/forgotpassword/resetPassword");
        }
      }
    },
  });
  return { mutate, forgotPassRes, isPending };
}

export default useRequestNewCode;
