import { toast } from "@/components/ui/use-toast";
import changePassword, { ChangePasswordTypes } from "@/services/changePassword";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CircleCheck } from "lucide-react";

function useChangePassword() {
  const queryClient = useQueryClient();
  const { mutate, data, isPending } = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      if (data.status === "success") {
        toast({
          description: (
            <div className="flex gap-2 items-center">
              <CircleCheck className="w-5 text-green-700" strokeWidth={3} />
              Password change, Logging Out...
            </div>
          ),
          variant: "success",
        });

        setTimeout(() => {
          queryClient.invalidateQueries();
        }, 1500);
      }
    },
  });

  function onChangePassword(data: ChangePasswordTypes) {
    const { currentPassword, newPassword, confirmPassword } = data;
    mutate({ currentPassword, newPassword, confirmPassword });
  }

  return { onChangePassword, data, isPending };
}

export default useChangePassword;
