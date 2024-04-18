import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Inputs } from "../pages/RootMainPage";
import { useMutation } from "@tanstack/react-query";
import login from "@/services/login";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleAuth } from "@/utils/globalSlice";
import { useSelector } from "react-redux";
import { Slice } from "@/types/sliceTypes";
import { Loader } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const dipsatch = useDispatch();
  const { isAuth } = useSelector((state: Slice) => state.persistedReducer);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const {
    mutate,
    data: loginResponse,
    isPending,
  } = useMutation({
    mutationKey: ["userData"],
    mutationFn: ({ email, password }: Inputs) => login(email, password),
  });

  async function onSubmit(data: Inputs) {
    const { email, password } = data;
    mutate({ email, password });
  }

  useEffect(() => {
    const delay = setTimeout(() => {
      if (!isPending) {
        if (isAuth || loginResponse?.status === "success") {
          dipsatch(toggleAuth(true));
          navigate("/notes");
        }
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [loginResponse, navigate, dipsatch, isAuth, isPending]);

  return (
    <form
      className="p-8 flex-1 flex flex-col justify-center gap-3 border border-gray-400 rounded-md shadow-sm min-[500px]:w-[400px] min-[500px]:mx-auto md:w-[450px] md:py-16 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="email"
        id="email"
        autoFocus
        {...register("email", { required: "This field is required!" })}
        placeholder="Email"
        className="px-3 py-2  w-full rounded-lg border border-blue-900 outline-none focus:ring-blue-900 focus:ring-1 placeholder:font-light placeholder:tracking-wider"
      />

      <input
        type="password"
        id="password"
        {...register("password", { required: true })}
        placeholder="Password"
        className="px-3 py-2  w-full rounded-lg border border-blue-900 outline-none focus:ring-blue-900 focus:ring-1 placeholder:font-light placeholder:tracking-wider"
      />

      <Button type="submit" disabled={isPending}>
        {isPending ? (
          <div className="flex items-center gap-1 tracking-wide">
            Logging in... <Loader className="animate-spin w-4" />
          </div>
        ) : (
          "Log in"
        )}
      </Button>

      {errors.password?.type === "required" && (
        <p
          role="alert"
          className="text-sm font-medium text-center text-red-800"
        >
          Password is required!
        </p>
      )}

      {loginResponse?.status === "fail" && (
        <p
          role="alert"
          className="text-sm font-medium text-center text-red-800"
        >
          {loginResponse.message}
        </p>
      )}

      <div
        className={`flex justify-evenly items-center border-t border-gray-600 py-1 md:mt-4 ${
          !errors.password || loginResponse?.status || "mt-5"
        }`}
      >
        <Link
          to="/forgotPassword"
          className="text-xs text-[#2e2e2e] hover:underline"
        >
          Forgot password?
        </Link>

        <span className="text-gray-600">|</span>

        <Link to="/register" className="text-xs text-[#2e2e2e] hover:underline">
          Need an account?
        </Link>
      </div>
    </form>
  );
}

export default Login;
