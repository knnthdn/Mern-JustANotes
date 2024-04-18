import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import useChangePassword from "@/hooks/useChangePassword";
import { ChangePasswordTypes } from "@/services/changePassword";

function ChangePassword() {
  const { register, handleSubmit } = useForm<ChangePasswordTypes>();
  const { onChangePassword, data, isPending } = useChangePassword();

  return (
    <div className="h-dvh flex flex-col">
      <header className="flex justify-between items-center px-4 py-6 border-b border-b-gray-300 sm:px-8 lg:py-10 lg:text-lg ">
        <Link to="/notes">
          <MoveLeft />
        </Link>

        <span className="block -ml-4 font-medium">Change Password</span>

        <span></span>
      </header>

      <div className="grow flex flex-col w-full justify-center px-5 sm:mx-8 xmd:mx-32 lg:mx-auto lg:w-[400px]">
        <form
          className="border border-gray-400 rounded-lg shadow-md w-full px-8 py-10 flex flex-col gap-2 -mt-14"
          onSubmit={handleSubmit(onChangePassword)}
        >
          <input
            type="password"
            id="currentPassword"
            placeholder="Current Password"
            className="px-3 py-2 w-full rounded-lg border border-blue-900 outline-none focus:ring-blue-900 focus:ring-1 placeholder:font-light placeholder:tracking-wider"
            {...register("currentPassword")}
          />

          <input
            type="password"
            id="newPassword"
            placeholder="New Password"
            className="px-3 py-2 w-full rounded-lg border border-blue-900 outline-none focus:ring-blue-900 focus:ring-1 placeholder:font-light placeholder:tracking-wider"
            {...register("newPassword")}
          />

          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            className="px-3 py-2  w-full rounded-lg border border-blue-900 outline-none focus:ring-blue-900 focus:ring-1 placeholder:font-light placeholder:tracking-wider"
            {...register("confirmPassword")}
          />

          <Button className="py-5  rounded-lg" disabled={isPending}>
            {isPending ? "Updating Password" : "Change Password"}
          </Button>

          {data?.status === "fail" || data?.status === "error" ? (
            <p className="text-center text-sm text-red-700 font-medium">
              {data.message}
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
