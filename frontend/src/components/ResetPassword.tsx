import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import resetPassword, { ResetPasswordType } from "@/services/resetPassword";
import { toast } from "./ui/use-toast";
import { CircleCheck, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Slice } from "@/types/sliceTypes";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setForgotPassEmail } from "@/utils/globalSlice";
import useRequestNewCode from "@/hooks/useRequestNewCode";

function ResetPassword() {
  const { register, handleSubmit } = useForm<ResetPasswordType>();
  const { forgotPassEmail } = useSelector(
    (state: Slice) => state.persistedReducer
  );
  const codeInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(60);

  const { mutate: reqNewCode, isPending: isRequesting } =
    useRequestNewCode(true);

  const {
    mutate,
    data: resetRes,
    isPending,
  } = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      if (data.status === "success") {
        toast({
          description: (
            <div className="flex gap-2 items-center text-sm">
              <CircleCheck className="w-5 text-green-700" strokeWidth={3} />
              Password Reset Successfully.
            </div>
          ),
          variant: "success",
        });

        navigate("/login");
        dispatch(setForgotPassEmail(""));
      }
    },
  });

  function onRessetingPassword(data: ResetPasswordType) {
    const { newPassword, confirmPassword, resetCode } = data;
    mutate({ email: forgotPassEmail, newPassword, confirmPassword, resetCode });
  }

  function requestInteval() {
    clearInterval(codeInterval.current as NodeJS.Timeout);
    codeInterval.current = setInterval(() => {
      setTimer((cur) => cur - 1);
    }, 1000);
  }

  function onRequestAnotherCode() {
    reqNewCode(forgotPassEmail, {
      onSuccess: () => {
        setTimer(60);
        requestInteval();
      },
    });
  }

  useEffect(() => {
    if (!forgotPassEmail) return navigate("/login");
    if (!timer) return clearInterval(codeInterval.current as NodeJS.Timeout);

    requestInteval();

    return () => {
      clearInterval(codeInterval.current as NodeJS.Timeout);
    };
  }, [forgotPassEmail, navigate, timer]);

  return (
    <form
      className="border border-gray-400 mx-5 mt-5 rounded-md shadow-sm pb-8 min-[500px]:w-[400px] min-[500px]:mx-auto md:w-[450px] "
      onSubmit={handleSubmit(onRessetingPassword)}
    >
      <div className="py-2 border-b border-gray-400 text-lg font-semibold text-main mb-2 px-2">
        Resseting password.
      </div>

      <div className="px-5 flex flex-col gap-2">
        <p>Enter the code sent in your email account.</p>

        <input
          type="password"
          id="newPassword"
          required
          autoFocus
          placeholder="New Password"
          className="px-3 py-2  w-full rounded-lg border border-blue-900 outline-none focus:ring-blue-900 focus:ring-1 placeholder:font-light placeholder:tracking-wider"
          {...register("newPassword")}
        />

        <input
          type="password"
          id="confirmPassword"
          required
          placeholder="Confirm Password"
          className="px-3 py-2  w-full rounded-lg border border-blue-900 outline-none focus:ring-blue-900 focus:ring-1 placeholder:font-light placeholder:tracking-wider"
          {...register("confirmPassword")}
        />

        <input
          type="text"
          id="resetcode"
          placeholder="code"
          className="px-3 py-2  w-full rounded-lg border border-blue-900 outline-none focus:ring-blue-900 focus:ring-1 placeholder:font-light placeholder:tracking-wider"
          {...register("resetCode")}
        />

        {resetRes?.status === "fail" && (
          <p className="text-center text-sm text-red-700">{resetRes.message}</p>
        )}

        {timer ? (
          <p className="text-center text-sm">
            {" "}
            Request code in: {timer < 10 ? "00:0" : "00:"}
            {timer}
          </p>
        ) : (
          <button
            type="button"
            className="text-sm underline"
            onClick={onRequestAnotherCode}
            disabled={isPending || isRequesting}
          >
            {!isRequesting ? "Request another code" : "Sending another code..."}
          </button>
        )}

        <Button
          className="w-fit self-end mr-1"
          type="submit"
          disabled={isPending}
        >
          {!isPending ? (
            "Enter"
          ) : (
            <>
              validating code... <Loader className="animate-spin w-4" />{" "}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

export default ResetPassword;
