import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import { useDispatch } from "react-redux";
import { setForgotPassEmail } from "@/utils/globalSlice";
import useRequestNewCode from "@/hooks/useRequestNewCode";

function FindUser() {
  const { register, handleSubmit } = useForm<{ email: string }>();
  const dispatch = useDispatch();

  const { mutate, forgotPassRes, isPending } = useRequestNewCode(false);

  function onGetResetCode(data: { email: string }) {
    mutate(data.email, {
      onSuccess: () => dispatch(setForgotPassEmail(data.email)),
    });
  }

  return (
    <form
      className="border border-gray-400 mx-5 mt-5 rounded-md shadow-sm pb-8 min-[500px]:w-[400px] min-[500px]:mx-auto md:w-[450px]  "
      onSubmit={handleSubmit(onGetResetCode)}
    >
      <div className="py-2 border-b border-gray-400 text-lg font-semibold text-main mb-2 px-2">
        Forgot your password
      </div>

      <div className="px-5 flex flex-col gap-2">
        <p>Enter your email account to reset your password.</p>

        <input
          type="email"
          id="email"
          required
          autoFocus
          placeholder="Email"
          className="px-3 py-2  w-full rounded-lg border border-blue-900 outline-none focus:ring-blue-900 focus:ring-1 placeholder:font-light placeholder:tracking-wider"
          {...register("email")}
        />

        {forgotPassRes?.status === "fail" && (
          <p className="text-center text-sm text-red-700">
            {forgotPassRes?.message}
          </p>
        )}

        <Button
          className="w-fit self-end mr-1 flex gap-1 items-center"
          disabled={isPending}
        >
          {!isPending ? (
            "Enter"
          ) : (
            <>
              validating email... <Loader className="animate-spin w-4" />{" "}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

export default FindUser;
