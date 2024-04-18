import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";
import signUser, { SignType } from "@/services/signinUser";
import { toast } from "./ui/use-toast";
import { CircleCheck, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function Register() {
  const { register, handleSubmit } = useForm<SignType>();
  const navigate = useNavigate();

  const {
    mutate,
    data: signResponse,
    isPending,
  } = useMutation({
    mutationFn: signUser,
    onSuccess: (data) => {
      if (data.status === "success") {
        toast({
          description: (
            <div className="flex gap-2 items-center">
              <CircleCheck className="w-5 text-green-700" strokeWidth={3} />
              Sign in Successfully, Redirecting to login page...
            </div>
          ),
          variant: "success",
        });

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    },
  });

  function onSigningin(data: SignType) {
    const { email, password, confirmPassword } = data;

    mutate({ email, password, confirmPassword });
  }

  return (
    <form
      className="px-8 py-8 flex-1 flex flex-col justify-center gap-2 border border-gray-400 rounded-md shadow-sm min-[500px]:w-[400px] min-[500px]:mx-auto md:w-[450px] md:py-16 "
      onSubmit={handleSubmit(onSigningin)}
    >
      <input
        type="email"
        id="email"
        autoFocus
        placeholder="Email"
        className="px-3 py-2  w-full rounded-lg border border-blue-900 outline-none focus:ring-blue-900 focus:ring-1 placeholder:font-light placeholder:tracking-wider"
        {...register("email")}
      />
      <input
        type="password"
        id="password"
        placeholder="Password"
        className="px-3 py-2  w-full rounded-lg border border-blue-900 outline-none focus:ring-blue-900 focus:ring-1 placeholder:font-light placeholder:tracking-wider"
        {...register("password")}
      />

      <input
        type="password"
        id="confirmPassword"
        placeholder="Confirm password"
        className="px-3 py-2  w-full rounded-lg border border-blue-900 outline-none focus:ring-blue-900 focus:ring-1 placeholder:font-light placeholder:tracking-wider"
        {...register("confirmPassword")}
      />

      {signResponse?.status === "fail" && (
        <p className="text-center text-sm text-red-700">
          {signResponse?.message}
        </p>
      )}

      <Button disabled={isPending}>
        {isPending ? (
          <div className="flex items-center gap-1 tracking-wide">
            Signing in... <Loader className="animate-spin w-4" />
          </div>
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  );
}

export default Register;
